import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import { tentukanTier } from "../../lib/pointUtils";
import {
  Users,
  Search,
  AlertTriangle,
  Trash2,
  ArrowDown,
  ShieldAlert,
  CheckCircle,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

const MotionDiv = motion.div;

export default function LoyaltyAdmin() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [logMessage, setLogMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();

    const channel = supabase
      .channel("realtime-loyalty")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "member_points" },
        () => {
          fetchMembers(); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, nama_lengkap, email, created_at, member_points(total_points, lifetime_points, tier)")
        .eq("role", "member")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMembers((data || []).map((profile) => ({
        id: profile.id,
        name: profile.nama_lengkap,
        email: profile.email,
        join_date: new Date(profile.created_at).toLocaleDateString("id-ID"),
        points: profile.member_points?.[0]?.total_points || 0,
        lifetimePoints: profile.member_points?.[0]?.lifetime_points || 0,
        tier: profile.member_points?.[0]?.tier || "bronze",
        status: "Normal",
      })));
    } catch (error) {
      alert("Gagal memuat loyalty member: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDowngradePoints = async (id, currentPoints, memberName) => {
    const updatedPoints = Math.max(0, currentPoints - 2000);

    try {
      const member = members.find((item) => item.id === id);
      const stableTier = tentukanTier(member?.lifetimePoints || 0);
      const { error: pointError } = await supabase
        .from("member_points")
        .update({
          total_points: updatedPoints,
          tier: stableTier,
        })
        .eq("user_id", id);

      if (pointError) throw pointError;

      const { error: logError } = await supabase.from("point_transactions").insert([
        {
          user_id: id,
          jumlah_poin: 2000,
          jenis: "debit",
          keterangan: "Sanksi pengurangan poin dari admin loyalty",
        },
      ]);

      if (logError) throw logError;
      triggerLog(`Poin member "${memberName}" berhasil dipotong -2000 Poin.`);
      fetchMembers();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteMember = async (id, memberName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus keanggotaan loyalty "${memberName}"?`)) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ deleted_at: new Date().toISOString() })
          .eq("id", id);

        if (error) throw error;
        triggerLog(`Loyalty Member "${memberName}" telah dinonaktifkan.`);
        fetchMembers();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const triggerLog = (msg) => {
    setLogMessage(msg);
    setTimeout(() => setLogMessage(null), 4000);
  };

  const filteredMembers = members.filter(
    (m) =>
      (m.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] p-6 font-sans text-slate-900 antialiased relative">
      
      <AnimatePresence>
        {logMessage && (
          <MotionDiv 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-50 max-w-md p-4 bg-[#F97316] text-white font-semibold rounded-2xl text-xs shadow-xl flex items-center gap-3 border border-orange-400/20"
          >
            <CheckCircle className="text-white w-5 h-5 shrink-0" />
            <span>{logMessage}</span>
          </MotionDiv>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <ShieldAlert className="text-orange-600 h-7 w-7 md:h-8 md:w-8" />
              Sistem Proteksi & Manajemen Loyalty Member
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1 font-medium">
              Data terhubung langsung dengan Database Supabase secara Real-time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Member</p>
              <p className="text-2xl font-black text-slate-900">{loading ? "..." : members.length} User</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><AlertTriangle className="w-6 h-6 animate-pulse" /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Terindikasi Curang</p>
              <p className="text-2xl font-black text-amber-600">{members.filter((m) => m.points < 0).length} Akun</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Sanksi Aktif</p>
              <p className="text-2xl font-black text-rose-600">{members.filter((m) => m.points === 0).length} Kasus</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama atau email member..."
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={fetchMembers} className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-black text-slate-500 hover:text-slate-900 border border-slate-200 rounded-2xl px-4 py-2.5 hover:bg-slate-50 uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5" /> Reload Database
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                  <th className="p-4 pl-6">Nama User / Email</th>
                  <th className="p-4">Tanggal Gabung</th>
                  <th className="p-4">Jumlah Poin</th>
                  <th className="p-4">Tier Status</th>
                  <th className="p-4">Kondisi Sistem</th>
                  <th className="p-4 pr-6 text-center">Tindakan Sanksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center p-12 text-slate-400 font-bold">Memuat Data dari Supabase...</td>
                  </tr>
                ) : filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{member.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{member.email}</p>
                    </td>
                    <td className="p-4 font-semibold text-slate-500">{member.join_date}</td>
                    <td className="p-4 font-black text-slate-900">{member.points.toLocaleString("id-ID")} <span className="text-[10px] text-slate-400 font-bold">Pts</span></td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wide ${
                        member.tier === "gold" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                        member.tier === "silver" ? "bg-slate-100 text-slate-700 border border-slate-200" :
                        member.tier === "platinum" ? "bg-cyan-50 text-cyan-700 border border-cyan-100" : "bg-orange-50 text-orange-700 border border-orange-100"
                      }`}>
                        {member.tier}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                        member.status === "Normal" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        member.status === "Suspicious" ? "bg-amber-50 text-amber-700 border border-amber-100 animate-pulse" : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}>
                        {member.status === "Suspicious" && <AlertTriangle className="w-3 h-3" />}
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleDowngradePoints(member.id, member.points, member.name)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors shadow-sm"
                        >
                          <ArrowDown className="w-3.5 h-3.5" /> Sanksi Poin
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="inline-flex items-center justify-center p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
