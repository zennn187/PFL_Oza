import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAward,
  FaCrown,
  FaExchangeAlt,
  FaGem,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
  FaTicketAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AVAILABLE_VOUCHERS = [
  {
    id: "VCH-01",
    title: "Gratis Ongkir Instan",
    cost: 80,
    description: "Tanpa minimum transaksi untuk seluruh paket katering.",
  },
  {
    id: "VCH-02",
    title: "Potongan Harga Rp 50.000",
    cost: 180,
    description: "Berlaku untuk pemesanan prasmanan atau buffet.",
  },
  {
    id: "VCH-03",
    title: "Free Premium Dessert Box",
    cost: 120,
    description: "Tambahan hidangan penutup manis di pesanan berikutnya.",
  },
];

const TIER_BENEFITS = [
  {
    title: "Loyalty Bronze",
    tier: "Bronze",
    discount: "5%",
    desc: "Diskon dasar untuk member baru.",
    color: "from-amber-700 to-amber-500",
    glow: "shadow-amber-500/10",
  },
  {
    title: "Loyalty Silver",
    tier: "Silver",
    discount: "15%",
    desc: "Diskon menengah untuk pesanan rutin.",
    color: "from-slate-400 to-slate-200",
    glow: "shadow-slate-400/10",
  },
  {
    title: "Loyalty Gold",
    tier: "Gold",
    discount: "30%",
    desc: "Diskon maksimal dan prioritas antrean dapur.",
    color: "from-amber-500 to-yellow-300",
    glow: "shadow-amber-500/20",
  },
];

export default function LoyaltyPage({ authState = "guest", setAuthState }) {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const isLoggedIn = Boolean(user?.id);

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    if (setAuthState) setAuthState("guest");
    navigate("/login");
  };

  const guardMemberAction = () => {
    if (isLoggedIn) return true;
    toast("Anda harus login terlebih dahulu", { description: "Klik login untuk melanjutkan akses fitur member." });
    navigate("/login");
    return false;
  };

  const [points, setPoints] = useState(850);
  const [tier, setTier] = useState("Bronze");
  const [redeemCode, setRedeemCode] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [transactions, setTransactions] = useState([
    { id: "TX-9901", date: "2026-06-14", amount: 150000, basePoints: 15, note: "Poin Normal" },
    { id: "TX-9844", date: "2026-06-12", amount: 320000, basePoints: 32, note: "Poin Normal" },
  ]);

  useEffect(() => {
    // Tier dibuat lebih realistis biar progress tidak terasa terlalu jauh
    if (points <= 150) setTier("Bronze");
    else if (points <= 300) setTier("Silver");
    else setTier("Gold");
  }, [points]);

  const showFeedback = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleSimulateTransaction = () => {
    if (!guardMemberAction()) return;

    const today = new Date();
    const lastTxDate = transactions.length > 0 ? new Date(transactions[0].date) : today;
    const diffTime = Math.abs(today - lastTxDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Simulasi dibuat sederhana & terasa cepat:
    // - Normal: +50 pts
    // - Jika < 3 hari sejak transaksi sebelumnya: +100 pts (anggap sebagai 2x)
    const amount = 250000;
    const normalPts = 50;
    const multiplier = diffDays <= 3 && transactions.length > 0 ? 2 : 1;
    const finalPointsEarned = normalPts * multiplier;

    const note = multiplier > 1 ? "Bonus Akumulasi Cepat" : "Simulasi Transaksi";

    setPoints((prev) => Math.min(prev + finalPointsEarned, 500));
    setTransactions((prev) => [
      {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        date: today.toISOString().split("T")[0],
        amount,
        basePoints: finalPointsEarned,
        note,
      },
      ...prev,
    ]);

    showFeedback("success", `Berhasil transaksi! +${finalPointsEarned} Pts (${note}).`);
  };

  const handleRedeemCode = (event) => {
    event.preventDefault();
    if (!guardMemberAction()) return;

    if (redeemCode.trim().toUpperCase() === "ONCATERINGORANGE") {
      // Sesuaikan dengan sistem poin baru agar tidak terlalu jauh
      setPoints((prev) => Math.min(prev + 40, 500));
      setRedeemCode("");
      showFeedback("success", "Kode redeem berhasil! 40 poin ditambahkan.");
      return;
    }
    showFeedback("error", "Kode redeem salah atau sudah kedaluwarsa.");
  };

  const handleExchangeVoucher = (cost, title) => {
    if (!guardMemberAction()) return;
    if (points < cost) {
      showFeedback("error", "Poin Anda belum cukup untuk menukar voucher ini.");
      return;
    }
    setPoints((prev) => Math.max(0, prev - cost));
    showFeedback("success", `Voucher "${title}" berhasil ditukar!`);
  };


  const getProgressPercentage = () => {
    // Progress per segment tier:
    // Bronze: 0-150
    // Silver: 151-300
    // Gold: 301-500
    if (tier === "Bronze") return Math.min((points / 150) * 100, 100);
    if (tier === "Silver") return Math.min(((points - 150) / 150) * 100, 100);
    return Math.min(((points - 300) / 200) * 100, 100);
  };

  const TierIcon = tier === "Bronze" ? FaAward : tier === "Silver" ? FaGem : FaCrown;

  const getTierGradient = () => {
    if (tier === "Bronze") return "from-orange-600/95 to-amber-700/95";
    if (tier === "Silver") return "from-slate-700/95 to-slate-900/95";
    return "from-amber-500 to-orange-600";
  };

  const displayName = profile?.nama_lengkap || user?.email?.split("@")[0] || "Member";

  return (
    <div className="w-full overflow-y-auto bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] text-[#1E293B] antialiased selection:bg-orange-500 selection:text-white">
      <Navbar
        isAuthenticated={isLoggedIn}
        onLogout={handleLogout}
        variant={isLoggedIn ? "landing" : "guest"}
        userName={displayName}
      />

      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-xl backdrop-blur-md ${
              message.type === "success" ? "bg-emerald-500/90 shadow-emerald-500/15" : "bg-rose-500/90 shadow-rose-500/15"
            }`}
          >
            {message.type === "success" ? <FaCheckCircle className="text-xl animate-bounce" /> : <FaTimesCircle className="text-xl" />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="relative">
            <div className="absolute -left-6 -top-3 h-12 w-12 rounded-3xl bg-orange-500/10 blur-xl" />
            <h1 className="relative bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
              Loyalty & Keanggotaan Member
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <p className="text-sm text-slate-500 font-medium">
                Makin sering pesan katering, makin tinggi tier dan benefit belanja yang didapat.
              </p>

              {!isLoggedIn && (
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-orange-700 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Preview
                </span>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSimulateTransaction}
            className="relative overflow-hidden flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#F43F5E] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-[#F97316]/15 transition-all"
          >
            <span className="absolute inset-0 bg-white/15 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
            <FaExchangeAlt className="relative z-10" /> Simulasi Transaksi Cepat
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${getTierGradient()} p-8 text-white shadow-xl shadow-orange-900/10 border border-white/10`}
            >
              {/* glow */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

              {/* Perbaikan UI: pattern dibuat lebih halus & minim agar tidak terkesan template generik */}
              <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />

              <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                    Status Akun
                  </span>

                  <div className="mt-2 flex items-center gap-3">
                      <div className="rounded-2xl bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur-sm">
                        <p className="text-[10px] font-black uppercase tracking-wider text-white/70">Member</p>
                        <h2 className="text-3xl font-black uppercase tracking-wide drop-shadow-sm leading-none">
                          {tier}
                        </h2>
                      </div>
                      {isLoggedIn && (
                        <div className="rounded-2xl bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur-sm">
                          <p className="text-[10px] font-black uppercase tracking-wider text-white/70">Nama</p>
                          <p className="text-sm font-bold uppercase tracking-wide leading-none">
                            {displayName}
                          </p>
                        </div>
                      )}

                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      <TierIcon className="text-3xl text-yellow-300 drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]" />
                    </motion.div>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                    Total Poin
                  </p>
                  <p className="mt-1 text-4xl font-black tracking-tight text-yellow-300 drop-shadow-sm">
                    {points} <span className="text-xs font-bold text-white/80">pts</span>
                  </p>
                  {isLoggedIn && (
                    <p className="mt-1 text-[11px] font-semibold text-white/70">
                      {profile?.no_telepon || ''}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative z-10 mt-10 space-y-3">
                <div className="h-4 w-full overflow-hidden rounded-full border border-white/10 bg-black/20 p-0.5 backdrop-blur-sm">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-300 to-white shadow-md"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>

                <div className="grid grid-cols-3 text-center text-[10px] font-black uppercase tracking-wider text-white/60">
                  <div className={`text-left ${tier === "Bronze" ? "text-yellow-300 font-black" : ""}`}>
                    <span>Bronze</span>
                    <p className="text-[9px] opacity-80">0 - 150 Pts</p>
                  </div>
                  <div className={`text-center ${tier === "Silver" ? "text-yellow-300 font-black" : ""}`}>
                    <span>Silver</span>
                    <p className="text-[9px] opacity-80">151 - 300 Pts</p>
                  </div>
                  <div className={`text-right ${tier === "Gold" ? "text-yellow-300 font-black" : ""}`}>
                    <span>Gold</span>
                    <p className="text-[9px] opacity-80">301 - 500 Pts</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-xs backdrop-blur-md border border-white/10">
                <FaAward className="mt-0.5 shrink-0 text-lg text-yellow-300" />
                <p className="leading-relaxed font-medium text-white/90">
                  <strong className="text-white font-bold">Booster Cepat:</strong> transaksi berikutnya dalam <span className="text-yellow-300 font-bold">≤ 3 hari</span> dapat <span className="text-yellow-300 font-bold">2x</span> poin (simulasi).
                </p>
              </div>

              {isLoggedIn && (
                <div className="relative z-10 mt-4 flex items-center justify-between rounded-2xl bg-white/10 p-4 text-xs backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-300" />
                    <span className="font-semibold text-white/90">Status: Active Member</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/15 hover:bg-white/20 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.section>

            <section className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-base font-bold text-slate-800">
                <FaAward className="text-orange-500" /> Keuntungan Eksklusif Tingkat {tier}
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {TIER_BENEFITS.map((benefit, index) => {
                  const isActive = benefit.tier === tier;

                  return (
                    <motion.div
                      key={benefit.tier}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                        isActive
                          ? `border-orange-500 bg-gradient-to-b from-orange-50/30 to-orange-50/10 shadow-lg ${benefit.glow} ring-1 ring-orange-400`
                          : "border-slate-100 bg-slate-50/50 opacity-50 grayscale-[30%]"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                          Aktif
                        </span>
                      )}
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">{benefit.title}</h4>
                      <p className={`my-3 text-4xl font-black bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                        {benefit.discount} <span className="text-xs font-bold text-slate-400">OFF</span>
                      </p>
                      <p className="text-xs font-medium leading-relaxed text-slate-500">{benefit.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <FaHistory className="text-orange-500" /> Riwayat Poin
                </h3>

                {isLoggedIn && (
                  <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-orange-700 shadow-sm">
                    {profile?.role === 'admin' ? 'Admin' : 'Member'}
                  </span>
                )}
              </div>

              <div className="max-h-52 divide-y divide-slate-100 overflow-y-auto pr-2 scrollbar-thin">
                {transactions.length === 0 ? (
                  <div className="flex h-40 items-center justify-center text-center px-4">
                    <p className="text-xs font-semibold text-slate-400">
                      Belum ada transaksi simulasi.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {transactions.map((transaction) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between py-3.5 text-xs transition-colors hover:bg-slate-50/50 px-2 rounded-xl"
                      >
                        <div>
                          <p className="font-bold text-slate-800">
                            {transaction.id} —{" "}
                            <span className="text-slate-500">
                              Rp {transaction.amount.toLocaleString("id-ID")}
                            </span>
                          </p>
                          <p className="mt-1 text-[10px] font-medium text-slate-400">
                            {transaction.date} •{" "}
                            <span className="font-semibold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-md">
                              {transaction.note}
                            </span>
                          </p>
                        </div>
                        <span className="rounded-xl bg-emerald-50 px-3 py-1.5 font-extrabold text-emerald-600 border border-emerald-100 shadow-sm">
                          +{transaction.basePoints} Pts
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-slate-50 opacity-60 pointer-events-none">
                <FaTicketAlt size={100} />
              </div>
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-800">
                <FaTicketAlt className="text-orange-500" /> Punya Kode Redeem?
              </h3>
              <p className="mb-5 text-xs font-medium text-slate-400 leading-relaxed">
                Masukkan kode promosi resmi katering untuk klaim bonus poin instan.
              </p>

              <form onSubmit={handleRedeemCode} className="space-y-3 relative z-10">
                <input
                  type="text"
                  placeholder="CONTOH: ONCATERINGORANGE"
                  value={redeemCode}
                  onChange={(event) => setRedeemCode(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 font-mono text-xs uppercase tracking-wider transition-all focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-[#F97316] to-[#F43F5E] py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/15 transition-all hover:shadow-xl hover:shadow-orange-500/20"
                >
                  Klaim Kode Redeem
                </motion.button>
              </form>
            </section>

            <section className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-1 flex items-center gap-2 text-base font-bold text-slate-800">
                <FaTicketAlt className="text-orange-500" /> Tukar Voucher Katering
                {isLoggedIn && (
                  <span className="ml-auto rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-orange-700">
                    {points} Pts
                  </span>
                )}
              </div>
              <p className="mb-6 text-xs font-medium text-slate-400">
                Gunakan akumulasi poin reward untuk klaim benefit pesanan.
              </p>

              <div className="space-y-4">
                {AVAILABLE_VOUCHERS.map((voucher) => {
                  const isAffordable = points >= voucher.cost;
                  return (
                    <motion.div
                      key={voucher.id}
                      whileHover={isAffordable ? { y: -3, shadow: "md" } : {}}
                      className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-xs font-bold text-slate-800 transition-colors group-hover:text-orange-600">
                            {voucher.title}
                          </h4>
                          <span className="shrink-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-1 text-[10px] font-black text-white shadow-sm">
                            {voucher.cost} Pts
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] font-medium leading-relaxed text-slate-400">{voucher.description}</p>
                      </div>

                      <motion.button
                        whileTap={isAffordable ? { scale: 0.97 } : {}}
                        onClick={() => handleExchangeVoucher(voucher.cost, voucher.title)}
                        disabled={!isAffordable}
                        className={`w-full rounded-xl py-2.5 text-[11px] font-black uppercase tracking-wider transition-all border ${
                          isAffordable
                            ? "bg-white text-orange-600 border-orange-200 shadow-sm hover:bg-orange-500 hover:text-white hover:border-orange-500"
                            : "cursor-not-allowed bg-slate-200/60 border-transparent text-slate-400"
                        }`}
                      >
                        {isAffordable ? "Tukarkan Poin Sekarang" : "Poin Tidak Cukup"}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}