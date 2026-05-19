import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard, MdKeyboardArrowRight, MdKeyboardArrowDown, MdFastfood, MdExtension } from "react-icons/md";
import { FaUsers, FaUtensils, FaClipboardList, FaTruck, FaChartBar, FaStar, FaStore } from "react-icons/fa";

export default function Sidebar() {
    const [openMenus, setOpenMenus] = useState({ Operational: true }); // Default Operational terbuka

    const toggleMenu = (name) => {
        setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

    // Styling Class Helpers
    const categoryTitle = "text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4";
    
    const navLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-3 rounded-full transition-all duration-200 group mb-1
        ${isActive ? "bg-[#F97316] text-white shadow-md" : "text-gray-400 hover:text-[#F97316]"}`;

    const subLinkClass = ({ isActive }) =>
        `flex items-center pl-14 py-2.5 rounded-full transition-all duration-200 mb-1
        ${isActive ? "bg-[#F97316] text-white shadow-sm" : "text-gray-500 hover:text-[#F97316]"}`;

    return (
        <div className="flex min-h-screen w-[260px] flex-col bg-white border-r border-gray-100 font-sans sticky top-0 h-screen">
            {/* Logo Section - Aprycot Style */}
            <div className="p-6 mb-4 flex justify-center border-b border-gray-50">
                <div className="relative inline-block">
                    <h1 className="text-2xl font-serif font-bold text-[#0D1B3E]">
                        On-Catering<span className="text-[#F97316]">.</span>
                    </h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-8 bg-orange-100/50 rounded-full -z-10 blur-sm"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 no-scrollbar">
                {/* --- MAIN MENU --- */}
                <div className="mt-4">
                    <p className={categoryTitle}>Main Menu</p>
                    <NavLink to="/dashboard" className={navLinkClass}>
                        <MdSpaceDashboard className="text-xl mr-4" />
                        <span className="text-sm font-bold">Dashboard</span>
                    </NavLink>
                    <NavLink to="/toko" className={navLinkClass}>
                        <FaStore className="text-lg mr-4" />
                        <span className="text-sm font-bold">Profil Katering</span>
                    </NavLink>
                    <NavLink to="/products" className={navLinkClass}>
                        <MdFastfood className="text-xl mr-4" />
                        <span className="text-sm font-bold">Products</span>
                    </NavLink>
                    <NavLink to="/components" className={navLinkClass}>
                        <MdExtension className="text-xl mr-4" />
                        <span className="text-sm font-bold">Components</span>
                    </NavLink>
                </div>

                {/* --- OPERATIONAL (Dropdown) --- */}
                <div className="mt-6">
                    <p className={categoryTitle}>Operational</p>
                    
                    <div>
                        <button 
                            onClick={() => toggleMenu("Operational")}
                            className={`w-full flex items-center px-4 py-3 rounded-full transition-all mb-1
                            ${openMenus["Operational"] ? "bg-[#F97316] text-white shadow-lg" : "text-gray-400"}`}
                        >
                            <FaUtensils className="text-lg mr-4" />
                            <span className="flex-1 text-left text-sm font-bold">Manajemen Menu</span>
                            {openMenus["Operational"] ? <MdKeyboardArrowDown className="text-xl" /> : <MdKeyboardArrowRight className="text-xl" />}
                        </button>

                        {openMenus["Operational"] && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/menu-list" className={subLinkClass}>
                                    <div className={`w-1.5 h-1.5 rounded-full mr-3 ${openMenus["Operational"] ? "bg-white" : "bg-gray-300"}`}></div>
                                    <span className="text-sm">Daftar Menu</span>
                                </NavLink>
                                <NavLink to="/kategori-menu" className={({ isActive }) => `flex items-center pl-14 py-2.5 text-gray-400 hover:text-[#F97316] transition-all`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3"></div>
                                    <span className="text-sm">Kategori Produk</span>
                                </NavLink>
                                <NavLink to="/stok" className={({ isActive }) => `flex items-center pl-14 py-2.5 text-gray-400 hover:text-[#F97316] transition-all`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3"></div>
                                    <span className="text-sm">Stok Bahan</span>
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/pesanan" className={navLinkClass}>
                        <FaClipboardList className="text-lg mr-4" />
                        <span className="text-sm font-bold">Daftar Pesanan</span>
                    </NavLink>
                    
                    <NavLink to="/pengiriman" className={navLinkClass}>
                        <FaTruck className="text-lg mr-4" />
                        <span className="text-sm font-bold">Status Pengiriman</span>
                    </NavLink>
                </div>

                {/* --- CUSTOMER & FINANCE --- */}
                <div className="mt-6 pb-10">
                    <p className={categoryTitle}>Reports & Data</p>
                    <NavLink to="/pelanggan" className={navLinkClass}>
                        <FaUsers className="text-lg mr-4" />
                        <span className="text-sm font-bold">Data Pelanggan</span>
                    </NavLink>
                    <NavLink to="/laporan" className={navLinkClass}>
                        <FaChartBar className="text-lg mr-4" />
                        <span className="text-sm font-bold">Laporan Keuangan</span>
                    </NavLink>
                    <NavLink to="/ulasan" className={navLinkClass}>
                        <FaStar className="text-lg mr-4" />
                        <span className="text-sm font-bold">Ulasan Pelanggan</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}