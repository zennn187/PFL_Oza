import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key yang ada di Dashboard Supabase kamu
const supabaseUrl = 'https://lhageigjdpvfjjfshfae.supabase.co/rest/v1/';
const supabaseAnonKey = 'sb_publishable_l6KTL_GyvbAlQjBh9LZsbA_NsEk2Vnd...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);