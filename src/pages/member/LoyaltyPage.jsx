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
import Navbar from "../../components/Navbar";

const AVAILABLE_VOUCHERS = [
  {
    id: "VCH-01",
    title: "Gratis Ongkir Instan",
    cost: 150,
    description: "Tanpa minimum transaksi untuk seluruh paket katering.",
  },
  {
    id: "VCH-02",
    title: "Potongan Harga Rp 50.000",
    cost: 350,
    description: "Berlaku untuk pemesanan prasmanan atau buffet.",
  },
  {
    id: "VCH-03",
    title: "Free Premium Dessert Box",
    cost: 200,
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
  const [points, setPoints] = useState(850);
  const [tier, setTier] = useState("Bronze");
  const [redeemCode, setRedeemCode] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [transactions, setTransactions] = useState([
    { id: "TX-9901", date: "2026-06-14", amount: 150000, basePoints: 15, note: "Poin Normal" },
    { id: "TX-9844", date: "2026-06-12", amount: 320000, basePoints: 32, note: "Poin Normal" },
  ]);

  useEffect(() => {
    if (points <= 1000) setTier("Bronze");
    else if (points <= 2000) setTier("Silver");
    else setTier("Gold");
  }, [points]);

  const showFeedback = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleSimulateTransaction = () => {
    const today = new Date();
    const lastTxDate = transactions.length > 0 ? new Date(transactions[0].date) : today;
    const diffTime = Math.abs(today - lastTxDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const amount = 250000;
    const basePointsGenerated = Math.floor(amount / 10000);
    const multiplier = diffDays <= 3 && transactions.length > 0 ? 2 : 1;
    const note = multiplier > 1 ? "Bonus Streak Transaksi Cepat" : "Transaksi Normal";
    const finalPointsEarned = Math.floor(basePointsGenerated * multiplier);

    setPoints((prev) => Math.min(prev + finalPointsEarned, 3000));
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
    if (redeemCode.trim().toUpperCase() === "ONCATERINGORANGE") {
      setPoints((prev) => Math.min(prev + 250, 3000));
      setRedeemCode("");
      showFeedback("success", "Kode redeem berhasil! 250 poin ditambahkan.");
      return;
    }
    showFeedback("error", "Kode redeem salah atau sudah kedaluwarsa.");
  };

  const handleExchangeVoucher = (cost, title) => {
    if (points < cost) {
      showFeedback("error", "Poin Anda belum cukup untuk menukar voucher ini.");
      return;
    }
    setPoints((prev) => prev - cost);
    showFeedback("success", `Voucher "${title}" berhasil ditukar!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    if (setAuthState) setAuthState("guest");
  };

  const getProgressPercentage = () => {
    if (tier === "Bronze") return Math.min((points / 1000) * 100, 100);
    if (tier === "Silver") return Math.min(((points - 1000) / 1000) * 100, 100);
    return Math.min(((points - 2000) / 1000) * 100, 100);
  };

  const TierIcon = tier === "Bronze" ? FaAward : tier === "Silver" ? FaGem : FaCrown;

  const getTierGradient = () => {
    if (tier === "Bronze") return "from-orange-600/95 to-amber-700/95";
    if (tier === "Silver") return "from-slate-700/95 to-slate-900/95";
    return "from-amber-500 to-orange-600";
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] text-[#1E293B] antialiased selection:bg-orange-500 selection:text-white">
      <Navbar isAuthenticated={authState === "authenticated"} onLogout={handleLogout} />

      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-2xl backdrop-blur-md ${
              message.type === "success" ? "bg-emerald-500/90 shadow-emerald-500/20" : "bg-rose-500/90 shadow-rose-500/20"
            }`}
          >
            {message.type === "success" ? <FaCheckCircle className="text-xl animate-bounce" /> : <FaTimesCircle className="text-xl" />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
              Loyalty & Keanggotaan Member
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Makin sering pesan katering, makin tinggi tier dan benefit belanja yang didapat.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSimulateTransaction}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-all"
          >
            <FaExchangeAlt /> Simulasi Transaksi Cepat
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${getTierGradient()} p-8 text-white shadow-xl shadow-orange-900/10`}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

              <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Status Akun Anda</span>
                  <div className="mt-1 flex items-center gap-3">
                    <h2 className="text-3xl font-black uppercase tracking-wide drop-shadow-sm">
                      Member {tier}
                    </h2>
                    <motion.div 
                      animate={{ y: [0, -4, 0] }} 
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      <TierIcon className="text-3xl text-yellow-300 drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]" />
                    </motion.div>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Total Poin Terkumpul</p>
                  <p className="mt-1 text-4xl font-black tracking-tight text-yellow-300 drop-shadow-sm">
                    {points} <span className="text-xs font-bold text-white/80">pts</span>
                  </p>
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
                    <p className="text-[9px] opacity-80">0 - 1000 Pts</p>
                  </div>
                  <div className={`text-center ${tier === "Silver" ? "text-yellow-300 font-black" : ""}`}>
                    <span>Silver</span>
                    <p className="text-[9px] opacity-80">1001 - 2000 Pts</p>
                  </div>
                  <div className={`text-right ${tier === "Gold" ? "text-yellow-300 font-black" : ""}`}>
                    <span>Gold</span>
                    <p className="text-[9px] opacity-80">2001 - 3000 Pts</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-xs backdrop-blur-md border border-white/10">
                <FaAward className="mt-0.5 shrink-0 text-lg text-yellow-300" />
                <p className="leading-relaxed font-medium text-white/90">
                  <strong className="text-white font-bold">Sistem Booster Frekuensi Aktif:</strong> Transaksi katering berikutnya dalam waktu kurang dari 3 hari dari pesanan terakhir otomatis dapat multiplier <span className="text-yellow-300 font-bold">2x poin</span>.
                </p>
              </div>
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
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-500">
                <FaHistory className="text-orange-500" /> Riwayat Transaksi Penambahan Poin
              </h3>
              <div className="max-h-52 divide-y divide-slate-100 overflow-y-auto pr-2 scrollbar-thin">
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
                          {transaction.id} — <span className="text-slate-500">Rp {transaction.amount.toLocaleString("id-ID")}</span>
                        </p>
                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          {transaction.date} • <span className="font-semibold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-md">{transaction.note}</span>
                        </p>
                      </div>
                      <span className="rounded-xl bg-emerald-50 px-3 py-1.5 font-extrabold text-emerald-600 border border-emerald-100 shadow-sm">
                        +{transaction.basePoints} Pts
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
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
                  className="w-full rounded-2xl bg-slate-900 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-black"
                >
                  Klaim Kode Redeem
                </motion.button>
              </form>
            </section>

            <section className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="mb-1 flex items-center gap-2 text-base font-bold text-slate-800">
                <FaTicketAlt className="text-orange-500" /> Tukar Voucher Katering
              </h3>
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