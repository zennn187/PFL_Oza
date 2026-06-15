import React, { useState, useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaBan,
  FaDollarSign,
  FaEllipsisH
} from "react-icons/fa";

const ordersData = [
  { orderId: "ORD030", customerName: "Eka Yulianti", orderDate: "2026-04-30", totalPrice: 2750000, status: "Pending", segment: "VIP" },
  { orderId: "ORD029", customerName: "Doni Prayoga", orderDate: "2026-04-29", totalPrice: 420000, status: "Completed", segment: "Regular" },
  { orderId: "ORD028", customerName: "Cahya Ningrum", orderDate: "2026-04-28", totalPrice: 150000, status: "Pending", segment: "New Customer" },
  { orderId: "ORD027", customerName: "Bella Safira", orderDate: "2026-04-27", totalPrice: 84000, status: "Cancelled", segment: "Regular" },
  { orderId: "ORD026", customerName: "Andi Saputra", orderDate: "2026-04-26", totalPrice: 635000, status: "Completed", segment: "VIP" },
];

// Komponen Pembungkus Animasi Masuk (Fade Up) saat Scroll / Load awal
function ScrollReveal({ children, delay = 0 }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) will-change-[transform,opacity] ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ pending: 0, completed: 0, cancelled: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const sortedOrders = [...ordersData]
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5)
      .map(order => ({
        ...order,
        date: new Date(order.orderDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        totalFormatted: `Rp ${order.totalPrice.toLocaleString('id-ID')}`
      }));
    setRecentOrders(sortedOrders);

    const pendingT = ordersData.filter(o => o.status.toLowerCase() === "pending").length;
    const completedT = ordersData.filter(o => o.status.toLowerCase() === "completed").length;
    const cancelledT = ordersData.filter(o => o.status.toLowerCase() === "cancelled").length;
    const revenueT = ordersData.reduce((sum, o) => sum + o.totalPrice, 0);

    setCounts({ pending: pendingT, completed: completedT, cancelled: cancelledT, totalRevenue: revenueT });
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans text-[#232D42] pb-10 pt-6 selection:bg-orange-500 selection:text-white">
      <div className="px-8">
        
        {/* ==========================================
            HEADER - Dibuat lebih interaktif & clean
           ========================================== */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#232D42] to-gray-500 bg-clip-text text-transparent">
            Dashboard On-Catering
          </h1>
          <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Live System Updated
          </div>
        </div>

        {/* ==========================================
            HERO BANNER - TETAP SESUAI IMAGE_BC3508.JPG 
            (Sama sekali tidak diganti strukturnya)
           ========================================== */}
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
              <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-[2px]">✨ OPERASIONAL KATERING</span>
            </div>
            <h2 className="text-4xl font-bold mb-2">Hello, <span className="text-[#F97316]">Oza Okta!</span></h2>
            <p className="text-gray-500 text-sm mb-8">Selamat datang kembali. Ada <span className="text-[#F97316] font-bold">{counts.pending} pesanan baru</span> yg menunggu konfirmasi Anda hari ini.</p>
            <button className="bg-[#F97316] hover:bg-[#e86a14] text-white px-10 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-orange-500/30 active:scale-95">
              Check New Orders
            </button>
          </div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-50 rounded-full blur-3xl"></div>
        </div>

        {/* ==========================================
            STATS CARD - Sentuhan Efek Hover Orange-500
           ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Pending Orders", val: counts.pending, icon: FaShoppingCart, bg: "bg-orange-50", text: "text-orange-500" },
            { label: "Completed Orders", val: counts.completed, icon: FaCheckCircle, bg: "bg-emerald-50", text: "text-emerald-500" },
            { label: "Cancelled Orders", val: counts.cancelled, icon: FaBan, bg: "bg-rose-50", text: "text-rose-500" },
            { label: "Total Revenue", val: `Rp ${counts.totalRevenue.toLocaleString('id-ID')}`, icon: FaDollarSign, bg: "bg-orange-50", text: "text-orange-500" },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <div className="group bg-white rounded-[24px] p-6 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.01)] border border-transparent hover:border-orange-500/20 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_12px_24px_rgba(249,115,22,0.06)]">
                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1 transition-colors group-hover:text-gray-500">{item.label}</p>
                  <h3 className="text-2xl font-bold tracking-tight text-[#232D42]">{item.val}</h3>
                </div>
                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.bg}`}>
                  <item.icon className={`text-xl ${item.text}`} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ==========================================
            TABLE SECTION - Dibuat Sangat Berkelas & Dinamis
           ========================================== */}
        <ScrollReveal delay={250}>
          <div className="bg-white rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.01)] overflow-hidden border border-gray-100">
            <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
              <div>
                <h2 className="text-lg font-bold">Pesanan Terbaru</h2>
                <p className="text-xs text-gray-400 mt-0.5">Ikhtisar orderan masuk utk mempermudah Collaborative CRM sm dapur</p>
              </div>
              <button className="text-xs font-bold text-[#F97316] bg-orange-50 px-6 py-2.5 rounded-xl border border-orange-100/30 hover:bg-[#F97316] hover:text-white transition-all duration-300 transform active:scale-95">
                Lihat Semua
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAFAFA]/70 border-b border-gray-50">
                  <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-8 py-4 text-left">Order ID</th>
                    <th className="px-8 py-4 text-left">Pelanggan</th>
                    <th className="px-8 py-4 text-left">Segmentasi CRM</th>
                    <th className="px-8 py-4 text-left">Tanggal</th>
                    <th className="px-8 py-4 text-left">Total Harga</th>
                    <th className="px-8 py-4 text-left">Status</th>
                    <th className="px-8 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order, index) => (
                    <tr 
                      key={order.orderId} 
                      className="hover:bg-orange-50/20 transition-colors duration-200 group/row"
                    >
                      {/* ID Order dengan Badge Hover */}
                      <td className="px-8 py-5 text-sm font-bold text-[#F97316]">
                        <span className="bg-orange-50 px-2 py-0.5 rounded-md group-hover/row:bg-orange-100 transition-colors">
                          {order.orderId}
                        </span>
                      </td>

                      {/* Profil Pelanggan + Animasi Avatar */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm transform transition-transform duration-300 group-hover/row:scale-110 group-hover/row:rotate-12">
                            {order.customerName.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-gray-800 transition-colors group-hover/row:text-orange-600">{order.customerName}</span>
                        </div>
                      </td>

                      {/* Segmentasi CRM */}
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-md ${
                          order.segment === 'VIP' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 
                          order.segment === 'Regular' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                          'bg-gray-50 text-gray-600 border border-gray-100'
                        }`}>
                          {order.segment}
                        </span>
                      </td>

                      {/* Tanggal */}
                      <td className="px-8 py-5 text-sm text-gray-400 font-medium">{order.date}</td>

                      {/* Total Harga */}
                      <td className="px-8 py-5 text-sm font-bold text-gray-800">{order.totalFormatted}</td>

                      {/* Status Kreatif dengan Pulse Dot */}
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full border ${
                          order.status.toLowerCase() === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                          order.status.toLowerCase() === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            order.status.toLowerCase() === 'pending' ? 'bg-orange-500 animate-pulse' : 
                            order.status.toLowerCase() === 'completed' ? 'bg-emerald-500' : 
                            'bg-rose-500'
                          }`} />
                          {order.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Tombol Aksi */}
                      <td className="px-8 py-5 text-center text-gray-400">
                        <button className="p-1.5 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 active:scale-90">
                          <FaEllipsisH />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}