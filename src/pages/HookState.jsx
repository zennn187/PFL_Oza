import React, { useState, useEffect, useRef } from 'react';
import PageHeader from "../components/PageHeader";
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { FaUser, FaEnvelope, FaPhone, FaCrown, FaSearch, FaTimes } from 'react-icons/fa';
// UPDATE JALUR IMPORT: Keluar ke src, masuk ke lib, panggil supabaseClient
import { supabase } from '../lib/supabaseClient'; 

export default function HookState() {
  const [customers, setCustomers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    loyalty: 'Bronze',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('customers') 
          .select('*');

        if (error) throw error;
        if (data) setCustomers(data);
      } catch (error) {
        console.error('Gagal mengambil data dari Supabase:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([
          {
            customerName: formData.customerName,
            email: formData.email,
            phone: formData.phone,
            loyalty: formData.loyalty || 'Bronze',
          },
        ])
        .select();

      if (error) throw error;

      setSubmitSuccess('Customer berhasil ditambahkan!');
      setFormData({ customerName: '', email: '', phone: '', loyalty: 'Bronze' });
      setShowForm(false);

      // Refresh data
      const { data: refreshed } = await supabase.from('customers').select('*');
      if (refreshed) setCustomers(refreshed);
    } catch (error) {
      setSubmitError(error.message || 'Gagal menambahkan customer.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer && customer.customerName ? customer.customerName.toLowerCase().includes(searchKeyword.toLowerCase()) : false
  );

  const getLoyaltyBadge = (loyalty) => {
    switch (loyalty?.toLowerCase()) {
      case 'gold':
        return 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-white shadow-md shadow-yellow-500/20';
      case 'silver':
        return 'bg-gradient-to-r from-slate-400 via-slate-350 to-slate-300 text-white shadow-md shadow-slate-400/20';
      default:
        return 'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-600 text-white shadow-md shadow-orange-500/20';
    }
  };

  return (
    <div id="hookstate-container" className="p-6 space-y-6 bg-slate-50/50 min-h-screen transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4">
      
      <PageHeader title="Customers" />
      
      {/* Tombol Tambah Customer */}
      <div className="flex justify-end">
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-sm"
        >
          + Tambah Customer
        </Button>
      </div>

      {/* Modal Form Tambah Customer */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border-0">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Tambah Customer
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 mt-1">
                    Isi data customer dengan lengkap
                  </CardDescription>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Nama Lengkap
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contoh@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Nomor Telepon
                  </label>
                  <Input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Level Loyalty
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Bronze', 'Silver', 'Gold'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, loyalty: level })}
                        className={`py-3 px-4 rounded-xl border-2 text-center transition-all duration-200 ${
                          formData.loyalty === level
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-lg mb-1">
                          {level === 'Bronze' && '🥉'}
                          {level === 'Silver' && '🥈'}
                          {level === 'Gold' && '🥇'}
                        </div>
                        <div className={`text-xs font-bold ${
                          formData.loyalty === level ? 'text-orange-700' : 'text-gray-600'
                        }`}>
                          {level} Member
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                    {submitError}
                  </div>
                )}

                {submitSuccess && (
                  <div className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
                    {submitSuccess}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-600/20 transition-all disabled:opacity-50"
                  >
                    {submitLoading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="bg-white border border-slate-100 shadow-sm space-y-3 transition-all duration-300 hover:shadow-md hover:border-slate-200/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            Pencarian Real-time Data Pelanggan
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Kursor otomatis fokus pada kolom input saat halaman dimuat menggunakan <code className="text-orange-600 font-mono text-[11px]">useRef</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#F97316] transition-colors duration-200">
                <FaSearch className="w-3.5 h-3.5" />
              </span>
              <Input 
                ref={searchInputRef} 
                type="text" 
                placeholder="Cari nama mitra katering atau pelanggan..." 
                value={searchKeyword} 
                onChange={(e) => setSearchKeyword(e.target.value)} 
                className="pl-11 pr-4 py-5 border-slate-200 rounded-xl focus:ring-4 focus:ring-[#F97316]/10 focus:border-[#F97316] transition-all duration-300 bg-slate-50/50 focus:bg-white text-xs text-slate-800 shadow-inner focus:shadow-none"
              />
            </div>
            {searchKeyword && (
              <Button 
                onClick={() => setSearchKeyword('')} 
                variant="outline"
                className="py-5 px-4 border-slate-200 rounded-xl hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 text-slate-600 font-medium text-xs flex items-center gap-1.5 transition-all duration-300 active:scale-95 animate-in zoom-in-95 duration-150"
              >
                <FaTimes className="w-2.5 h-2.5" /> Bersihkan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Hasil Penyaringan Konten
          </h2>
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none py-0.5 px-2.5 text-[11px] font-bold transition-all duration-300 shadow-sm shadow-orange-500/20 hover:scale-105">
            {filteredCustomers.length} Terdeteksi
          </Badge>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-xs text-slate-400">
            Memuat data pelanggan dari Supabase...
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center shadow-inner animate-in fade-in zoom-in-95 duration-300">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400 animate-bounce duration-1000">
              <FaUser className="w-4 h-4" />
            </div>
            <p className="text-slate-700 text-sm font-medium">Mitra Tidak Ditemukan</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Ganti kata kunci pencarian Anda untuk memicu state filter baru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCustomers.map((customer, index) => (
              <div 
                key={customer.id || customer.customerId || index}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-orange-200/60 transition-all duration-300 group relative overflow-hidden animate-in fade-in slide-in-from-bottom-3 fill-mode-both"
                style={{
                  animationDelay: `${Math.min(index * 50, 300)}ms`,
                  animationDuration: '400ms'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-orange-50 group-hover:text-[#F97316] group-hover:rotate-3 flex items-center justify-center transition-all duration-300 font-bold border border-slate-100 text-[10px]">
                    {customer.customerId || `C-${index+1}`}
                  </div>
                  <span className={`text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full transform group-hover:scale-105 transition-transform duration-300 ${getLoyaltyBadge(customer.loyalty)}`}>
                    <span className="flex items-center gap-1">
                      <FaCrown className="w-2.5 h-2.5 group-hover:animate-pulse" /> {customer.loyalty || 'REGULAR'}
                    </span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 mb-3 group-hover:text-[#F97316] transition-colors duration-200 line-clamp-1">
                  {customer.customerName}
                </h3>

                <div className="space-y-1.5 border-t border-slate-50 pt-3 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2 group/item cursor-pointer">
                    <FaEnvelope className="w-3 text-slate-400 group-hover/item:text-slate-600 group-hover/item:translate-x-0.5 transition-all duration-200" />
                    <span className="truncate group-hover/item:text-slate-700 transition-colors duration-200">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 group/item cursor-pointer">
                    <FaPhone className="w-3 text-slate-400 group-hover/item:text-slate-600 group-hover/item:translate-x-0.5 transition-all duration-200" />
                    <span className="group-hover/item:text-slate-700 transition-colors duration-200">{customer.phone || 'Tidak Ada Telepon'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}