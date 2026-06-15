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
      
      <PageHeader title="Hook State CRM" />
      
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