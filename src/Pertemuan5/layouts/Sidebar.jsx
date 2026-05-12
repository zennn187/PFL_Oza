import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: MdDashboard, color: "text-green-600" },
        { name: "Orders", icon: MdDashboard, color: "text-blue-600" },
        { name: "Customers", icon: MdDashboard, color: "text-purple-600" }
    ];

    return (
        <div className="flex min-h-screen w-80 flex-col bg-white p-8 shadow-2xl animate-slideInLeft">
            {/* Logo */}
            <div className="flex flex-col mb-10 group cursor-pointer transition-transform duration-300 hover:scale-105">
                <span className="font-poppins text-5xl text-gray-900">
                    Sedap <b className="text-green-500 animate-pulse">.</b>
                </span>
                <span className="font-semibold text-gray-400 text-sm">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div className="flex-1">
                <ul className="space-y-3">
                    {menuItems.map((item, index) => (
                        <li
                            key={item.name}
                            onClick={() => setActiveMenu(item.name)}
                            className={`
                                group relative overflow-hidden cursor-pointer rounded-xl p-4 font-medium 
                                transition-all duration-300 hover:translate-x-2
                                ${activeMenu === item.name 
                                    ? 'bg-gradient-to-r from-green-50 to-transparent text-green-600 shadow-md' 
                                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent'
                                }
                            `}
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: 'backwards'
                            }}
                        >
                            <div className="flex items-center">
                                <item.icon className={`mr-4 text-xl transition-all duration-300 group-hover:scale-110 ${activeMenu === item.name ? item.color : 'text-gray-400 group-hover:text-green-500'}`} />
                                <span>{item.name}</span>
                            </div>
                            {activeMenu === item.name && (
                                <div className="absolute left-0 top-0 h-full w-1 bg-green-500 animate-slideInRight"></div>
                            )}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-auto animate-fadeInUp animation-delay-500">
                <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg mb-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-1">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative">
                        <div className="text-white text-sm">
                            <span>Please organize your menus through button below!</span>
                            <div className="flex justify-center items-center p-2 mt-3 bg-blue-500 rounded-md space-x-2 transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95">
                                <FaPlus className="text-white animate-pulse" />
                                <span className="text-white">Add Menus</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="transition-all duration-300 hover:translate-x-2">
                    <span className="font-bold text-gray-400 block text-sm">Sedap Restaurant Admin Dashboard</span>
                    <p className="font-light text-gray-400 text-xs mt-1">&copy; 2025 All Right Reserved</p>
                </div>
            </div>
        </div>
    );
}