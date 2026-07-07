import { createClient } from '@supabase/supabase-js';

// Ambil langsung nilai URL dan Anon Key tanpa modifikasi regex yang berisiko
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing! Check your Vercel Settings or .env file.');
}

// Berikan string kosong sebagai fallback aman agar createClient tidak throws unhandled error saat build
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
export default supabase;