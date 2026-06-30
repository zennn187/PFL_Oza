import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import FiturOza from "./pages/FiturOza";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./lib/CartContext";
import { useAuth } from "./context/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const LoyaltyPage = React.lazy(() => import("./pages/member/LoyaltyPage"));
const LoyaltyAdmin = React.lazy(() => import("./pages/admin/LoyaltyAdmin"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"));
const Components = React.lazy(() => import("./pages/Components"));
const KomponenShadCN = React.lazy(() => import("./pages/KomponenShadCN"));
const DataPelanggan = React.lazy(() => import("./pages/DataPelanggan"));
const HookState = React.lazy(() => import("./pages/HookState"));
const ProfilKatering = React.lazy(() => import("./pages/ProfilKatering"));
const LandingPage = React.lazy(() => import("./pages/guest/LandingPage"));
const Checkout = React.lazy(() => import("./pages/member/Checkout"));

export default function App() {
  const { profile, loading, signOut } = useAuth();
  const authState = profile ? "authenticated" : "guest";

  const handleGlobalLogout = async () => {
    await signOut();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CartProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path="/" 
            element={
              authState === "guest" ? (
                <LandingPage authState={authState} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          <Route
            path="/member"
            element={
              <ProtectedRoute allowedRoles={["member", "admin"]}>
                <LoyaltyPage authState={authState} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["member", "admin"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute allowedRoles={["member", "admin"]}>
                <MainLayout onLogout={handleGlobalLogout} />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/loyalty-member"
              element={
                <LoyaltyPage authState={authState} />
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductsDetail />} />
            <Route path="/components" element={<Components />} />
            <Route path="/fitur-oza" element={<FiturOza />} />
            <Route path="/komponen-shadcn" element={<KomponenShadCN />} />
            <Route path="/data-pelanggan" element={<DataPelanggan />} />
            <Route path="/HookState" element={<HookState />} />
            <Route path="/profil-katering" element={<ProfilKatering />} />

            <Route path="/menu-list" element={<Products />} /> 
            <Route path="/kategori-menu" element={<Components />} /> 
            <Route path="/stok" element={<Products />} /> 
            <Route path="/pesanan" element={<Orders />} /> 
            <Route path="/pengiriman" element={<Dashboard />} /> 
            <Route path="/pelanggan" element={<DataPelanggan />} /> 
            <Route path="/laporan" element={<Dashboard />} /> 
            <Route path="/ulasan" element={<Customers />} /> 

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </CartProvider>
  );
}
