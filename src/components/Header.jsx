import { FaBell, FaSearch, FaEnvelope, FaGift, FaCog } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <div className="flex justify-between items-center py-4 px-8 bg-white mb-6 sticky top-0 z-10">
            <div className="relative w-full max-w-sm">
                <input
                    className="w-full bg-gray-50 text-sm text-gray-700 rounded-full pl-12 pr-4 py-3 outline-none border border-transparent focus:border-orange-500 focus:bg-white transition-all duration-300"
                    type="text"
                    placeholder="Search here"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                />
                <FaSearch className={`absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-orange-500' : 'text-gray-400'}`} />
            </div>

            <div className="flex items-center space-x-6">
                
                <div className="flex items-center space-x-4 border-r border-gray-200 pr-6">
                    <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors">
                        <FaBell className="text-xl" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors">
                        <FaEnvelope className="text-xl" />
                    </button>
                    <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors">
                        <FaGift className="text-xl" />
                    </button>
                    <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors">
                        <FaCog className="text-xl" />
                    </button>
                </div>

                <div className="flex items-center space-x-3 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">Oza Okta</p>
                        <p className="text-xs text-gray-500 font-medium">Admin</p>
                    </div>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIe3VuOA6oMIqC9QIR6mkvfG9stciQXtOZ4A&s"
                        className="w-10 h-10 rounded-xl object-cover shadow-sm"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
}