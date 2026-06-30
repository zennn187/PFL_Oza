-- =========================================================================
-- STEP 1: HELPER FUNCTIONS & TRIGGERS
-- =========================================================================


CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- STEP 2: TABLES
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama_lengkap varchar(100) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  role varchar(20) NOT NULL DEFAULT 'member' CONSTRAINT profiles_role_check CHECK (role IN ('admin', 'member', 'guest')),
  no_telepon varchar(20) NULL,
  alamat text NULL,
  avatar_url text NULL,
  deleted_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama varchar(100) NOT NULL UNIQUE,
  deskripsi text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama varchar(200) NOT NULL,
  sku varchar(50) UNIQUE NULL,
  deskripsi text NULL,
  harga numeric(15,2) NOT NULL CONSTRAINT products_harga_check CHECK (harga > 0),
  stok integer NOT NULL DEFAULT 0 CONSTRAINT products_stok_check CHECK (stok >= 0),
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  gambar_url text NULL,
  is_active boolean NOT NULL DEFAULT true,
  deleted_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor_pesanan varchar(50) NOT NULL UNIQUE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  status varchar(20) NOT NULL DEFAULT 'pending' CONSTRAINT orders_status_check CHECK (status IN ('pending','processing','shipped','completed','cancelled')),
  total_harga numeric(15,2) NOT NULL CONSTRAINT orders_total_check CHECK (total_harga >= 0),
  catatan text NULL,
  alamat_pengiriman text NULL,
  poin_diberikan integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  nama_produk varchar(200) NOT NULL,
  harga_satuan numeric(15,2) NOT NULL,
  quantity integer NOT NULL CONSTRAINT order_items_qty_check CHECK (quantity > 0),
  subtotal numeric(15,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.member_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_points integer NOT NULL DEFAULT 0 CONSTRAINT member_points_total_positive CHECK (total_points >= 0),
  lifetime_points integer NOT NULL DEFAULT 0 CONSTRAINT member_points_lifetime_positive CHECK (lifetime_points >= 0),
  tier varchar(20) NOT NULL DEFAULT 'bronze' CONSTRAINT member_points_tier_check CHECK (tier IN ('bronze','silver','gold','platinum')),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.point_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  jumlah_poin integer NOT NULL,
  jenis varchar(20) NOT NULL CONSTRAINT point_transactions_jenis_check CHECK (jenis IN ('credit','debit')),
  keterangan text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tier_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier_lama varchar(20) NOT NULL,
  tier_baru varchar(20) NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);

-- =========================================================================
-- STEP 1B: HELPER FUNCTION (depends on profiles)
-- =========================================================================

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS varchar AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =========================================================================
-- STEP 3: UPDATED_AT TRIGGERS
-- =========================================================================

DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_products ON public.products;
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_orders ON public.orders;
CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_member_points ON public.member_points;
CREATE TRIGGER set_updated_at_member_points BEFORE UPDATE ON public.member_points FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- STEP 4: INDEXES
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_products_deleted ON public.products(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_member_points_user_id ON public.member_points(user_id);

-- =========================================================================
-- STEP 5: ROW LEVEL SECURITY
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tier_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin select all profiles" ON public.profiles;
CREATE POLICY "Admin select all profiles" ON public.profiles FOR SELECT USING (public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "User select self profile" ON public.profiles;
CREATE POLICY "User select self profile" ON public.profiles FOR SELECT USING (id = auth.uid());
DROP POLICY IF EXISTS "User update self profile" ON public.profiles;
CREATE POLICY "User update self profile" ON public.profiles FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());
DROP POLICY IF EXISTS "Allow registration profiling" ON public.profiles;
CREATE POLICY "Allow registration profiling" ON public.profiles FOR INSERT WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "All authenticated can view categories" ON public.categories;
CREATE POLICY "All authenticated can view categories" ON public.categories FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Admin full manage categories" ON public.categories;
CREATE POLICY "Admin full manage categories" ON public.categories FOR ALL USING (public.get_my_role() = 'admin');

DROP POLICY IF EXISTS "View active products" ON public.products;
CREATE POLICY "View active products" ON public.products FOR SELECT TO authenticated USING (is_active = true AND deleted_at IS NULL);
DROP POLICY IF EXISTS "Admin view all products" ON public.products;
CREATE POLICY "Admin view all products" ON public.products FOR SELECT USING (public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "Admin manage products" ON public.products;
CREATE POLICY "Admin manage products" ON public.products FOR ALL USING (public.get_my_role() = 'admin');

DROP POLICY IF EXISTS "Admin view all orders" ON public.orders;
CREATE POLICY "Admin view all orders" ON public.orders FOR SELECT USING (public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "Member view own orders" ON public.orders;
CREATE POLICY "Member view own orders" ON public.orders FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Member create orders" ON public.orders;
CREATE POLICY "Member create orders" ON public.orders FOR INSERT WITH CHECK (user_id = auth.uid() AND public.get_my_role() = 'member');
DROP POLICY IF EXISTS "Admin update orders status" ON public.orders;
CREATE POLICY "Admin update orders status" ON public.orders FOR UPDATE USING (public.get_my_role() = 'admin');

DROP POLICY IF EXISTS "Admin view all order items" ON public.order_items;
CREATE POLICY "Admin view all order items" ON public.order_items FOR SELECT USING (public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "Member view own order items" ON public.order_items;
CREATE POLICY "Member view own order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
DROP POLICY IF EXISTS "Member insert order items" ON public.order_items;
CREATE POLICY "Member insert order items" ON public.order_items FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

DROP POLICY IF EXISTS "Admin view all points" ON public.member_points;
CREATE POLICY "Admin view all points" ON public.member_points FOR SELECT USING (public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "Member view own points" ON public.member_points;
CREATE POLICY "Member view own points" ON public.member_points FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Admin manage member points" ON public.member_points;
CREATE POLICY "Admin manage member points" ON public.member_points FOR UPDATE USING (public.get_my_role() = 'admin');

DROP POLICY IF EXISTS "Member update own points" ON public.member_points;
CREATE POLICY "Member update own points"
ON public.member_points
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "System init points on register" ON public.member_points;
CREATE POLICY "System init points on register" ON public.member_points FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "View own point logs" ON public.point_transactions;
CREATE POLICY "View own point logs" ON public.point_transactions FOR SELECT USING (user_id = auth.uid() OR public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "Admin insert point logs" ON public.point_transactions;
CREATE POLICY "Admin insert point logs" ON public.point_transactions FOR INSERT WITH CHECK (public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "View own tier history" ON public.tier_history;
CREATE POLICY "View own tier history" ON public.tier_history FOR SELECT USING (user_id = auth.uid() OR public.get_my_role() = 'admin');
DROP POLICY IF EXISTS "Admin insert tier history" ON public.tier_history;
CREATE POLICY "Admin insert tier history" ON public.tier_history FOR INSERT WITH CHECK (public.get_my_role() = 'admin');
