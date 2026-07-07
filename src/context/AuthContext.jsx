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
      return new Error('Email atau password salah, atau akun belum terdaftar.');
    }

    if (normalized.includes('email not confirmed')) {
      return new Error('Email belum dikonfirmasi. Silakan cek inbox email Anda lalu coba login lagi.');
    }

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
      // Cek session dari localStorage (custom login via public.users)
      const localSession = localStorage.getItem('user_session');
      if (localSession) {
        try {
          const parsed = JSON.parse(localSession);
          if (parsed && parsed.email) {
            setUser(parsed);
            // Fetch profile dari public.users atau profiles
            await fetchLegacyProfile(parsed);
            return;
          }
        } catch (e) {
          localStorage.removeItem('user_session');
        }
      }

      // Cek session dari Supabase Auth
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

  // Fetch profile dari public.users (legacy)
  const fetchLegacyProfile = async (userData) => {
    try {
      // PRIORITAS 1: Ambil dari tabel users (source of truth untuk hybrid login)
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .eq('email', userData.email)
        .single();

      if (usersData) {
        // Konversi ke format profile — AMBIL ROLE ASLI DARI TABEL USERS
        const customProfile = {
          id: usersData.auth_user_id || usersData.id,
          nama_lengkap: usersData.customerName || usersData.email?.split('@')[0] || 'Member',
          email: usersData.email,
          role: usersData.role || 'member',
          no_telepon: usersData.phone || null,
        };
        setProfile(customProfile);
        setLoading(false);
        return;
      }

      // PRIORITAS 2: Cek public.profiles (untuk user murni Supabase Auth)
      if (userData.id && typeof userData.id === 'string' && userData.id.includes('-')) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.id)
          .single();

        if (profileData) {
          setProfile(profileData);
          setLoading(false);
          return;
        }
      }

      setProfile(null);
    } catch (err) {
      console.error('Gagal memuat legacy profile:', err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    // === LANGKAH 1: Cari user di tabel public.users ===
    let userFromUsersTable = null;
    try {
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .eq('email', normalizedEmail);
      if (users && users.length > 0) {
        userFromUsersTable = users[0];
      }
    } catch (e) {
      // Abaikan error jika tabel tidak ada
    }

    // === PRIORITAS 1: Jika user ditemukan di public.users ===
    if (userFromUsersTable) {
      // Verifikasi password
      if (userFromUsersTable.password !== password) {
        setLoading(false);
        throw new Error('Password salah. Silakan coba lagi.');
      }

      // Jika user punya auth_user_id (pernah register via Supabase Auth), coba login via Supabase
      if (userFromUsersTable.auth_user_id) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });

          if (!error && data?.session?.user) {
            setUser(data.session.user);
            localStorage.setItem('user_session', JSON.stringify(data.session.user));
            await fetchProfile(data.session.user.id);
            return data;
          }
          // Jika Supabase Auth gagal tapi password di tabel users cocok — fallback ke legacy
          console.log('Supabase Auth gagal, fallback ke legacy session');
        } catch (e) {
          console.log('Supabase Auth error, fallback ke legacy:', e.message);
        }
      }

      // Login via public.users (legacy) — untuk semua user dari tabel users
      const sessionData = {
        email: userFromUsersTable.email,
        id: userFromUsersTable.auth_user_id || `legacy_${userFromUsersTable.id}`,
        customerName: userFromUsersTable.customerName,
        phone: userFromUsersTable.phone,
        role: userFromUsersTable.role || 'member',
      };

      setUser(sessionData);
      localStorage.setItem('user_session', JSON.stringify(sessionData));
      await fetchLegacyProfile(sessionData);

      return { user: sessionData };
    }

    // === PRIORITAS 3: User baru (tidak ada di public.users), coba Supabase Auth ===
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (!error && data?.session?.user) {
        setUser(data.session.user);
        localStorage.setItem('user_session', JSON.stringify(data.session.user));
        await fetchProfile(data.session.user.id);
        return data;
      }

      setLoading(false);
      throw new Error('Email atau password salah. Silakan coba lagi atau daftar akun baru.');
    } catch (e) {
      if (e.message && e.message.includes('Email atau password salah')) {
        throw e;
      }
      console.error('Login error:', e);
      setLoading(false);
      throw new Error('Email atau password salah. Silakan coba lagi atau daftar akun baru.');
    }
  };

  const signUp = async (email, password, namaLengkap, noTelepon) => {
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    // === LANGKAH 1: Coba Supabase Auth ===
    try {
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
        // Jika error karena konfigurasi Supabase Auth, fallback ke public.users
        if (error.message?.includes('anonymous provider') || 
            error.status === 400 || 
            error.message?.includes('email') ||
            error.message?.includes('signup')) {
          console.log('Supabase Auth signup gagal, fallback ke tabel users:', error.message);
          // Fallback ke tabel public.users
          return await signUpLegacy(normalizedEmail, password, namaLengkap, noTelepon);
        }
        setLoading(false);
        throw getFriendlyAuthError(error);
      }

      if (data?.user) {
        // Insert ke profiles
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

        if (profileError) {
          console.error('Gagal menginisialisasi profile:', profileError?.message);
        }
        if (pointError && pointError.code !== '23505') {
          console.error('Gagal menginisialisasi points:', pointError?.message);
        }

        // Update auth_user_id di tabel users jika sudah ada entry
        await supabase
          .from('users')
          .update({ auth_user_id: data.user.id })
          .eq('email', normalizedEmail);

        setLoading(false);
        return data;
      }

      // Jika data.user null (misalnya email confirmation required), fallback
      console.log('Supabase Auth signup mengembalikan user null, fallback ke tabel users');
      return await signUpLegacy(normalizedEmail, password, namaLengkap, noTelepon);
    } catch (e) {
      console.error('SignUp error:', e);
      // Fallback
      return await signUpLegacy(normalizedEmail, password, namaLengkap, noTelepon);
    }
  };

  // Fallback: daftar ke tabel public.users langsung
  const signUpLegacy = async (email, password, namaLengkap, noTelepon) => {
    try {
      // Cek apakah email sudah ada
      const { data: existingUsers } = await supabase
        .from('users')
        .select('id')
        .eq('email', email);

      if (existingUsers && existingUsers.length > 0) {
        setLoading(false);
        throw new Error('Email sudah terdaftar. Silakan login.');
      }

      // Insert ke tabel users
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            customerName: namaLengkap,
            email: email,
            phone: noTelepon || null,
            password: password,
            loyalty: 'Bronze',
            role: 'member',
          },
        ])
        .select('*')
        .single();

      if (insertError) {
        setLoading(false);
        throw new Error('Gagal mendaftarkan akun: ' + insertError.message);
      }

      // Simpan session
      const sessionData = {
        email: newUser.email,
        id: `legacy_${newUser.id}`,
        customerName: newUser.customerName,
        phone: newUser.phone,
        role: newUser.role || 'member',
      };

      setUser(sessionData);
      localStorage.setItem('user_session', JSON.stringify(sessionData));

      // Fetch profile
      const customProfile = {
        id: sessionData.id,
        nama_lengkap: namaLengkap,
        email: email,
        role: 'member',
        no_telepon: noTelepon || null,
      };
      setProfile(customProfile);

      setLoading(false);
      return { user: sessionData };
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const signOut = async () => {
    setLoading(true);
    // Sign out dari Supabase Auth
    await supabase.auth.signOut();
    // Hapus legacy session
    localStorage.removeItem('user_session');
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};