import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-6 bg-white shadow-lg animate-slideInDown">
            {/* Search Bar */}
            <div className="relative w-full max-w-lg group">
                <input
                    className="border-2 border-gray-100 p-3 pr-10 bg-gray-50 w-full max-w-lg rounded-xl outline-none transition-all duration-300 focus:border-green-500 focus:shadow-lg focus:bg-white"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer transition-all duration-300 group-hover:text-green-500 group-hover:scale-110" />
            </div>

            {/* Icon & Profile Section */}
            <div className="flex items-center space-x-4">
                {/* Notification Icon */}
                <div className="group relative p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl text-blue-600 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    <FaBell />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full px-2 py-1 text-xs text-white animate-pulse">
                        50
                    </span>
                </div>

                {/* Chart Icon */}
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg">
                    <FcAreaChart className="text-xl" />
                </div>

                {/* Settings Icon */}
                <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-lg">
                    <SlSettings />
                </div>

                {/* Profile Section */}
                <div className="flex items-center space-x-4 border-l pl-4 border-gray-200 group">
                    <span className="text-gray-700 transition-all duration-300 group-hover:text-green-600">
                        Hello, <b className="text-green-600">Oza Okta Gistrada</b>
                    </span>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIe3VuOA6oMIqC9QIR6mkvfG9stciQXtOZ4A&s"
                        className="w-12 h-12 rounded-full border-2 border-green-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
}