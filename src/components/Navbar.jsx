import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { MdNotifications, MdMail, MdCardGiftcard, MdSettings } from "react-icons/md";

export default function Navbar({ 
  isAuthenticated, 
  userRole = "Admin Utama", 
  userName = "Oza Okta", 
  onLogout,
  variant = "admin" // "admin" or "landing"
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("user_session");
      navigate("/login");
    }
  };

  const scrollToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // ====== ADMIN HEADER ======
  if (isAuthenticated && variant === "admin") {
    return (
      <header className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40 font-sans">
        <div className="relative w-72 hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <FaSearch className="text-sm" />
          </span>
          <input 
            type="text" 
            placeholder="Cari pesanan atau pelanggan..." 
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-orange-500 transition-all text-gray-700"
          />
        </div>

        <div className="flex items-center gap-5 ml-auto">
          <div className="flex items-center gap-3 text-xl text-gray-400 border-r border-gray-100 pr-4">
            <button className="hover:text-[#F97316] transition-colors relative">
              <MdNotifications />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="hover:text-[#F97316] transition-colors"><MdMail /></button>
            <button className="hover:text-[#F97316] transition-colors"><MdCardGiftcard /></button>
            <button className="hover:text-[#F97316] transition-colors"><MdSettings /></button>
          </div>

          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/profil-katering")}>
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-gray-800 group-hover:text-[#F97316] transition-colors">{userName || "Member"}</p>
              <p className="text-[10px] text-gray-400 font-medium">{userRole}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center shadow-sm shadow-orange-500/20">
              {(userName || "Member")
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="ml-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-2 font-bold"
            title="Keluar dari Sistem"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </header>
    );
  }

  // ====== MEMBER LANDING NAVBAR (logged in but still on landing page) ======
  if (isAuthenticated && variant === "landing") {
    return (
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 z-50 px-8 py-4 flex justify-between items-center font-sans">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-serif font-bold text-[#0D1B3E]">
            On-Catering<span className="text-[#F97316]">.</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-[#F97316] transition-colors">Home</button>
          <button onClick={() => scrollToSection("menu-category")} className="hover:text-[#F97316] transition-colors">Menu Category</button>
          <button onClick={() => scrollToSection("trending-orders")} className="hover:text-[#F97316] transition-colors">Trending Orders</button>
          <button onClick={() => navigate("/member")} className="hover:text-[#F97316] transition-colors">Loyalty</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/profil-katering")}>
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-gray-800 group-hover:text-[#F97316] transition-colors">{userName || "Member"}</p>
              <p className="text-[10px] text-gray-400 font-medium">Member</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center shadow-sm shadow-orange-500/20">
              {(userName || "Member")
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-2 font-bold"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    );
  }

  // ====== GUEST NAVBAR (default, not authenticated) ======
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 z-50 px-8 py-4 flex justify-between items-center font-sans">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-2xl font-serif font-bold text-[#0D1B3E]">
          On-Catering<span className="text-[#F97316]">.</span>
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-[#F97316] transition-colors">Home</button>
        <button onClick={() => scrollToSection("menu-category")} className="hover:text-[#F97316] transition-colors">Menu Category</button>
        <button onClick={() => scrollToSection("trending-orders")} className="hover:text-[#F97316] transition-colors">Trending Orders</button>
        <button onClick={() => navigate("/member")} className="hover:text-[#F97316] transition-colors">Member</button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate("/login")}
          className="text-sm font-bold text-gray-700 hover:text-[#F97316] transition-colors px-4 py-2"
        >
          Masuk / Login
        </button>
        <button 
          onClick={() => navigate("/register")}
          className="bg-[#F97316] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md shadow-orange-500/10"
        >
          Daftar Akun
        </button>
      </div>
    </nav>
  );
}
