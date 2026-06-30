import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from './AuthContextValue';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFriendlyAuthError = (error) => {
    const message = error?.message || 'Login gagal, silakan coba lagi.';
    const normalized = message.toLowerCase();

    if (normalized.includes('invalid login credentials')) {
      return new Error('Email atau password salah, atau akun belum terdaftar di Supabase Auth.');
    }

    if (normalized.includes('email not confirmed')) {
      return new Error('Email belum dikonfirmasi. Silakan cek inbox email Anda lalu coba login lagi.');
    }

    // Supabase auth errors often include error_description/code in the response body.
    // We keep the raw message for debugging and still show a friendly wrapper.
    return new Error(message);
  };

  const createProfileForUser = async (authUser) => {
    const metadata = authUser.user_metadata || {};
    const profilePayload = {
      id: authUser.id,
      nama_lengkap: metadata.nama_lengkap || metadata.full_name || authUser.email?.split('@')[0] || 'Member',
      email: authUser.email,
      role: metadata.role || 'member',
      no_telepon: metadata.no_telepon || null,
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert([profilePayload])
      .select('*')
      .single();

    if (error) throw error;

    const { error: pointError } = await supabase
      .from('member_points')
      .insert([{ user_id: authUser.id, total_points: 0, lifetime_points: 0, tier: 'bronze' }]);

    if (pointError && pointError.code !== '23505') {
      throw pointError;
    }

    return data;
  };

  const fetchProfile = async (userId) => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error?.code === 'PGRST116' && currentUser) {
        const createdProfile = await createProfileForUser(currentUser);
        setProfile(createdProfile);
        return;
      }

      if (error) {
        throw error;
      }
      setProfile(data || null);
    } catch (err) {
      console.error('Gagal memuat profil pengguna:', err.message || err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Gagal mengambil sesi Supabase:', error.message || error);
        setLoading(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);

    const signInPayload = {
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      const { data, error } = await supabase.auth.signInWithPassword(signInPayload);

      if (error) {
        // Supabase JS error object is inconsistent across versions.
        // Log as much as possible to pinpoint the exact auth configuration issue.
        console.error("Supabase signIn error raw:", error);
        console.error("Supabase signIn error fields:", {
          name: error?.name,
          status: error?.status,
          code: error?.code,
          message: error?.message,
          details: error?.details,
          hint: error?.hint,
        });

        setLoading(false);
        throw getFriendlyAuthError(error);
      }

      if (data?.session?.user) {
        setUser(data.session.user);
        localStorage.setItem('user_session', JSON.stringify(data.session.user));
        await fetchProfile(data.session.user.id);
      } else {
        setLoading(false);
      }

      return data;
    } catch (e) {
      console.error("signIn catch:", e);
      setLoading(false);
      throw e;
    }

    if (data?.session?.user) {
      setUser(data.session.user);
      localStorage.setItem('user_session', JSON.stringify(data.session.user));
      await fetchProfile(data.session.user.id);
    } else {
      setLoading(false);
    }

    return data;
  };

  const signUp = async (email, password, namaLengkap, noTelepon) => {
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          nama_lengkap: namaLengkap,
          no_telepon: noTelepon || null,
          role: 'member',
        },
      },
    });
    if (error) {
      setLoading(false);
      throw getFriendlyAuthError(error);
    }

    if (data?.user && data?.session) {
      const profilePayload = {
        id: data.user.id,
        nama_lengkap: namaLengkap,
        email: normalizedEmail,
        role: 'member',
        no_telepon: noTelepon || null,
      };

      const { error: profileError } = await supabase.from('profiles').insert([profilePayload]);
      const { error: pointError } = await supabase.from('member_points').insert([
        { user_id: data.user.id, total_points: 0, lifetime_points: 0, tier: 'bronze' },
      ]);

      if (profileError || pointError) {
        console.error('Gagal menginisialisasi profile/point data:', profileError?.message || pointError?.message);
      }
    }

    setLoading(false);
    return data;
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    localStorage.removeItem('user_session');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
