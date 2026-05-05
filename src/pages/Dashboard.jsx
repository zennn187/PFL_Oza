import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaBan,
  FaDollarSign,
  FaEllipsisH,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaGift,
  FaCog
} from "react-icons/fa";

/**
 * MOCK DATA ADMIN ON-CATERING
 */
const ordersData = [
  { orderId: "ORD030", customerName: "Eka Yulianti", orderDate: "2026-04-30", totalPrice: 156000, status: "Pending" },
  { orderId: "ORD029", customerName: "Doni Prayoga", orderDate: "2026-04-29", totalPrice: 470000, status: "Completed" },
  { orderId: "ORD028", customerName: "Cahya Ningrum", orderDate: "2026-04-28", totalPrice: 198000, status: "Pending" },
  { orderId: "ORD027", customerName: "Bella Safira", orderDate: "2026-04-27", totalPrice: 84000, status: "Cancelled" },
  { orderId: "ORD026", customerName: "Andi Saputra", orderDate: "2026-04-26", totalPrice: 635000, status: "Completed" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ pending: 0, completed: 0, cancelled: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Processing data orders
    const sortedOrders = [...ordersData]
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5)
      .map(order => ({
        ...order,
        date: new Date(order.orderDate).toLocaleDateString('id-ID'),
        totalFormatted: `Rp ${order.totalPrice.toLocaleString('id-ID')}`
      }));
    setRecentOrders(sortedOrders);

    // Stats Logic
    const pendingT = ordersData.filter(o => o.status === "Pending").length;
    const completedT = ordersData.filter(o => o.status === "Completed").length;
    const cancelledT = ordersData.filter(o => o.status === "Cancelled").length;
    const revenueT = ordersData.reduce((sum, o) => sum + o.totalPrice, 0);

    setCounts({ pending: pendingT, completed: completedT, cancelled: cancelledT, totalRevenue: revenueT });
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans text-[#232D42] pb-10">
      
      {/* TOP NAVIGATION BAR - Sesuai Referensi Gambar 8 & 14 */}
      <div className="flex items-center justify-between px-8 py-4 bg-transparent">
        <div className="relative w-72">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <FaSearch className="text-sm" />
          </span>
          <input 
            type="text" 
            placeholder="Search here..." 
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full bg-white text-sm focus:outline-none focus:ring-1 focus:ring-orange-300 transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-orange-500 transition-colors"><FaBell /></button>
            <button className="hover:text-orange-500 transition-colors"><FaEnvelope /></button>
            <button className="hover:text-orange-500 transition-colors"><FaGift /></button>
            <button className="hover:text-orange-500 transition-colors"><FaCog /></button>
          </div>
          <div className="flex items-center gap-3 ml-2 border-l pl-6 border-gray-200">
            <div className="text-right">
              <p className="text-sm font-bold leading-none">Oza Okta</p>
              <p className="text-[10px] text-gray-400 mt-1">Admin</p>
            </div>
            <img 
              src="https://ui-avatars.com/api/?name=Oza+Okta&background=f97316&color=fff" 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="px-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard On-Catering</h1>

        {/* WELCOME BANNER - Sesuai Referensi Gambar 11 & 14 */}
        <div className="relative w-full mb-8 overflow-hidden bg-white rounded-[24px] shadow-sm group">
          <div className="absolute inset-0 z-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000" 
              className="w-full h-full object-cover grayscale"
              alt="bg"
            />
          </div>
          <div className="relative z-10 px-10 py-12 flex flex-col items-start justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-[2px]">✨ DEAL OF THE WEEKEND</span>
            </div>
            <h2 className="text-4xl font-bold mb-2">Hello, <span className="text-[#F97316]">Oza Okta!</span></h2>
            <p className="text-gray-500 text-sm mb-8">Selamat datang kembali. Ada <span className="text-[#F97316] font-bold">{counts.pending} pesanan baru</span> yang menunggu konfirmasi Anda hari ini.</p>
            <button className="bg-[#F97316] hover:bg-[#e86a14] text-white px-10 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-orange-500/30 active:scale-95">
              Check New Orders
            </button>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-50 rounded-full blur-3xl"></div>
        </div>

        {/* STATS GRID - Corner Radius 24px [Cite: 1, 4] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Pending Orders", val: counts.pending, icon: FaShoppingCart, bg: "bg-blue-50", text: "text-blue-500" },
            { label: "Completed Orders", val: counts.completed, icon: FaCheckCircle, bg: "bg-green-50", text: "text-green-500" },
            { label: "Cancelled Orders", val: counts.cancelled, icon: FaBan, bg: "bg-red-50", text: "text-red-500" },
            { label: "Total Revenue", val: `Rp ${counts.totalRevenue.toLocaleString('id-ID')}`, icon: FaDollarSign, bg: "bg-orange-50", text: "text-orange-500" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-[24px] p-6 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-transform hover:translate-y-[-2px]">
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">{item.label}</p>
                <h3 className="text-2xl font-bold">{item.val}</h3>
              </div>
              <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${item.bg}`}>
                <item.icon className={`text-xl ${item.text}`} />
              </div>
            </div>
          ))}
        </div>

        {/* RECENT ORDERS TABLE - Sesuai Referensi Gambar 14 */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.02)] overflow-hidden border border-gray-50">
          <div className="px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Recent Orders</h2>
              <p className="text-xs text-gray-400">Overview of latest incoming catering orders</p>
            </div>
            <button className="text-xs font-bold text-[#F97316] bg-orange-50 px-6 py-2 rounded-xl hover:bg-[#F97316] hover:text-white transition-all">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FAFAFA]/50 border-y border-gray-50">
                <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-8 py-4 text-left">Order ID</th>
                  <th className="px-8 py-4 text-left">Customer</th>
                  <th className="px-8 py-4 text-left">Date</th>
                  <th className="px-8 py-4 text-left">Total</th>
                  <th className="px-8 py-4 text-left">Status</th>
                  <th className="px-8 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold">{order.orderId}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                          {order.customerName.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-400">{order.date}</td>
                    <td className="px-8 py-5 text-sm font-bold">{order.totalFormatted}</td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1 text-[10px] font-bold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-50 text-yellow-500' : 
                        order.status === 'completed' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center text-gray-300">
                      <button className="hover:text-orange-500 transition-colors"><FaEllipsisH /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}