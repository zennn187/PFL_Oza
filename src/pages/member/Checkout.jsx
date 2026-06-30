import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, CheckCircle2, ShieldCheck, Wallet, Landmark, CreditCard, QrCode, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/useAuth";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Ekstrak data keranjang belanja yang dikirimkan via router push state
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [orderStatus, setOrderStatus] = useState("Unpaid");
  const [isCreated, setIsCreated] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  // Jika halaman checkout diakses tanpa membawa data produk, kembalikan ke beranda
  useEffect(() => {
    if (!location.state || cartItems.length === 0) {
      navigate("/");
    }
  }, [location.state, cartItems, navigate]);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const parsePrice = (value) => {
    if (typeof value === "number") return value;
    return Number(String(value || "").replace(/[^0-9]/g, "")) || 0;
  };

  const handleProcessOrder = async () => {
    if (!address.trim()) {
      alert("Silakan masukkan alamat pengiriman terlebih dahulu.");
      return;
    }
    if (!user?.id) {
      alert("Silakan login terlebih dahulu sebelum checkout.");
      navigate("/login");
      return;
    }

    const generatedInvoice = "ONC-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const pendingItems = cartItems.map((item) => {
        const productId = item.product_id || item.id;
        if (!productId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(productId))) {
          throw new Error("Produk checkout harus berasal dari tabel products Supabase agar product_id UUID tersedia.");
        }

        const price = parsePrice(item.harga ?? item.price);
        const quantity = Number(item.quantity ?? item.qty) || 1;
        const name = item.nama ?? item.name ?? "Produk";

        return { productId, price, quantity, name };
      });

      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            nomor_pesanan: generatedInvoice,
            user_id: user.id,
            status: "pending",
            total_harga: totalPrice,
            alamat_pengiriman: address,
            catatan: `Metode pembayaran: ${paymentMethod}`,
          },
        ])
        .select("id, nomor_pesanan")
        .single();

      if (orderError) throw orderError;

      const itemsToInsert = pendingItems.map((item) => ({
          order_id: newOrder.id,
          product_id: item.productId,
          nama_produk: item.name,
          harga_satuan: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
      }));

      const { error: itemError } = await supabase.from("order_items").insert(itemsToInsert);
      if (itemError) throw itemError;

      setInvoiceId(newOrder.nomor_pesanan);
      setOrderId(newOrder.id);
      setIsCreated(true);
    } catch (err) {
      alert("Gagal mengirim pesanan ke Supabase: " + (err.message || err));
    }
  };

  const handleSimulatePayment = async () => {
    setIsSyncing(true);
    // Simulasi loading sinkronisasi payment gateway server ke basis data
    setTimeout(async () => {
      setOrderStatus("Paid");
      setIsSyncing(false);
      try {
        const { error } = await supabase.from("orders").update({ status: "processing" }).eq("id", orderId);
        if (error) throw error;
      } catch (err) {
        alert("Gagal mengupdate status transaksi: " + (err.message || err));
      }
    }, 1200);
  };

  const handleCompleteTransaction = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-slate-950 font-sans antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali ke Beranda
        </button>

        <h1 className="text-3xl font-black tracking-tight mb-8">Selesaikan Pesanan Anda</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-6">
            {/* INPUT ALAMAT */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xl shadow-orange-900/5">
              <h2 className="text-lg font-black text-slate-950 mb-4">📍 Alamat Pengiriman</h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isCreated}
                rows={3}
                placeholder="Tuliskan alamat lengkap pengiriman acara atau rumah Anda..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all disabled:opacity-60"
              />
            </div>

            {/* METODE PEMBAYARAN */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xl shadow-orange-900/5">
              <h2 className="text-lg font-black text-slate-950 mb-4">💳 Metode Pembayaran</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "qris", label: "QRIS Dinamis", icon: QrCode },
                  { id: "e-wallet", label: "E-Wallet OVO/Dana", icon: Wallet },
                  { id: "debit", label: "Debit Online", icon: Landmark },
                  { id: "credit", label: "Kartu Kredit", icon: CreditCard },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition-all ${
                        paymentMethod === item.id
                          ? "border-orange-500 bg-orange-50/40 shadow-sm"
                          : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
                      } ${isCreated ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${paymentMethod === item.id ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-black text-slate-800">{item.label}</span>
                      </div>
                      <input
                        type="radio"
                        name="payment_method"
                        value={item.id}
                        checked={paymentMethod === item.id}
                        onChange={() => !isCreated && setPaymentMethod(item.id)}
                        disabled={isCreated}
                        className="h-4 w-4 accent-orange-500 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* STATUS DAN GENERATE QRIS REAL-TIME */}
            {isCreated && (
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-orange-900/5 flex flex-col items-center text-center animate-fadeIn">
                <ShieldCheck className="h-12 w-12 text-orange-600 mb-2" />
                <h3 className="text-xl font-black text-slate-950">Menunggu Pembayaran</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">Kode Invoice: {invoiceId}</p>

                {paymentMethod === "qris" ? (
                  <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md flex flex-col items-center">
                    <div className="flex items-center justify-between w-full border-b pb-3 mb-4 gap-12">
                      <span className="text-sm font-black tracking-widest text-blue-900">QRIS</span>
                      <span className="text-xs font-bold text-slate-400">GPN INDONESIA</span>
                    </div>
                    {/* QR Code SVG Otomatis Mengikuti Nominal Total Belanja */}
                    <QRCodeSVG value={`00020101021226580016ID12345678901234552040000530336054${totalPrice}.005802ID5911ONCATERING6005JAKARTA61051234562070703A01`} size={220} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">NMSO: ON-CATERING PROD</span>
                    <span className="text-xl font-black text-slate-800 mt-2">{formatRupiah(totalPrice)}</span>
                  </div>
                ) : (
                  <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Nomor Rekening / Virtual Account</p>
                    <p className="text-2xl font-mono font-black text-slate-800 tracking-widest">992019384756201</p>
                    <p className="text-xs text-slate-500 mt-3 border-t pt-3">
                      Silakan transfer tepat sebesar <span className="font-black text-orange-600">{formatRupiah(totalPrice)}</span>.
                    </p>
                  </div>
                )}

                <div className="mt-8 w-full max-w-xs flex flex-col items-center">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Status Transaksi Real-time</span>
                  <span className={`mt-2 px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2 ${
                    orderStatus === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700 animate-pulse"
                  }`}>
                    {orderStatus === "Paid" ? "🟢 BERHASIL / LUNAS" : "🟡 MENUNGGU PEMBAYARAN"}
                  </span>

                  {orderStatus === "Unpaid" && (
                    <button
                      onClick={handleSimulatePayment}
                      disabled={isSyncing}
                      className="mt-6 w-full py-3 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSyncing && <RefreshCw className="h-3 w-3 animate-spin" />}
                      Simulasikan Pembayaran Berhasil
                    </button>
                  )}

                  {orderStatus === "Paid" && (
                    <button
                      onClick={handleCompleteTransaction}
                      className="mt-6 w-full py-4 bg-emerald-500 text-white rounded-full text-sm font-black hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 animate-fadeIn"
                    >
                      Selesai & Kembali Belanja
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RINGKASAN PRODUK */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xl shadow-orange-900/5 sticky top-8">
            <h2 className="text-lg font-black text-slate-950 mb-4">Ringkasan Pesanan</h2>
            <div className="divide-y divide-slate-100 max-h-[240px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id || item.name} className="py-3 flex justify-between items-center text-sm">
                  <div>
                    <h4 className="font-black text-slate-800 truncate max-w-[180px]">{item.nama || item.name}</h4>
                    <p className="text-slate-400 text-xs font-semibold">{item.quantity || item.qty} item x {formatRupiah(parsePrice(item.harga ?? item.price))}</p>
                  </div>
                  <span className="font-black text-slate-700">
                    {formatRupiah(parsePrice(item.harga ?? item.price) * (Number(item.quantity ?? item.qty) || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 mt-4 pt-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Subtotal</span>
                <span className="font-black text-slate-800">{formatRupiah(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Biaya Pengiriman</span>
                <span className="text-emerald-600 font-black inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Gratis
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 pt-3 border-t border-dashed border-slate-200">
                <span>Total Tagihan</span>
                <span className="text-orange-600 text-xl">{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            {!isCreated && (
              <button
                onClick={handleProcessOrder}
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-4 rounded-full text-sm font-black text-white text-center transition-all shadow-lg ${
                  cartItems.length > 0
                    ? "bg-orange-600 hover:bg-slate-950 shadow-orange-600/10 hover:shadow-xl cursor-pointer"
                    : "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
                }`}
              >
                Konfirmasi & Bayar Pesanan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
