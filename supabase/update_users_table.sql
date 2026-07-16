-- =====================================================
-- QUERY 1: Tambah kolom role ke tabel users
-- =====================================================
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'member';

-- =====================================================
-- QUERY 2: Set user tertentu jadi admin (ganti emailnya)
-- =====================================================
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'ozaoktagistradaa@gmail.com';

-- =====================================================
-- QUERY 3: Lihat semua user beserta role-nya
-- =====================================================
SELECT id, "customerName", email, phone, role, loyalty, auth_user_id 
FROM public.users 
ORDER BY id ASC;

-- =====================================================
-- QUERY 4: (Opsional) Update user yang sudah punya auth_user_id 
-- untuk sinkronisasi role dari tabel profiles
-- =====================================================
UPDATE public.users u
SET role = p.role
FROM public.profiles p
WHERE u.auth_user_id = p.id
  AND u.role IS DISTINCT FROM p.role;

-- =====================================================
-- QUERY 5: Hapus kolom password jika sudah tidak dipakai
-- (Jalankan setelah semua user migrasi ke Supabase Auth)
-- =====================================================
-- ALTER TABLE public.users DROP COLUMN IF EXISTS password;