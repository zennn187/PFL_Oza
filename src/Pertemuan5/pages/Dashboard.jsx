import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [counts, setCounts] = useState({
        orders: 0,
        delivered: 0,
        canceled: 0,
        revenue: 0
    });

    // Animasi counter
    useEffect(() => {
        const animateCount = (target, key) => {
            let start = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCounts(prev => ({ ...prev, [key]: target }));
                    clearInterval(timer);
                } else {
                    setCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
                }
            }, 16);
        };

        animateCount(75, 'orders');
        animateCount(175, 'delivered');
        animateCount(40, 'canceled');
        animateCount(128, 'revenue');
    }, []);

    return (
        <div className="animate-fadeIn">
            <PageHeader />
            
            <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Orders Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                            <FaShoppingCart className="text-3xl text-white transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 transition-all duration-300 group-hover:text-green-600">
                                {counts.orders}
                            </span>
                            <span className="text-gray-500 font-medium">Total Orders</span>
                        </div>
                    </div>
                    <div className="absolute bottom-3 right-3 text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Delivered Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-100">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                            <FaTruck className="text-3xl text-white transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 transition-all duration-300 group-hover:text-blue-600">
                                {counts.delivered}
                            </span>
                            <span className="text-gray-500 font-medium">Total Delivered</span>
                        </div>
                    </div>
                    <div className="absolute bottom-3 right-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Canceled Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-200">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                            <FaBan className="text-3xl text-white transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 transition-all duration-300 group-hover:text-red-600">
                                {counts.canceled}
                            </span>
                            <span className="text-gray-500 font-medium">Total Canceled</span>
                        </div>
                    </div>
                    <div className="absolute bottom-3 right-3 text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Revenue Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                            <FaDollarSign className="text-3xl text-white transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 transition-all duration-300 group-hover:text-yellow-600">
                                Rp.{counts.revenue}
                            </span>
                            <span className="text-gray-500 font-medium">Total Revenue</span>
                        </div>
                    </div>
                    <div className="absolute bottom-3 right-3 text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}