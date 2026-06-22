import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhageigjdpvfjjfshfae.supabase.co/rest/v1/';
const supabaseAnonKey = 'sb_publishable_l6KTL_GyvbAlQjBh9LZsbA_NsEk2Vnd...'; // Sesuaikan dengan key aslimu

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tambahkan baris ini di paling bawah agar default import bekerja dengan lancar
export default supabase;