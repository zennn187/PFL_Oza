import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { X, UserPlus, Loader2 } from 'lucide-react';
import { userAPI } from '../services/userAPI';

const Customers = () => {
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', loyalty: 'Bronze'
  });
  const [errors, setErrors] = useState({});

  const loadCustomers = async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const data = await userAPI.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setGlobalError("Gagal mengambil data dari Supabase: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Nama customer wajib diisi';
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Nomor telepon tidak valid (10-15 digit)';
    }
    return newErrors;
  };

  const handleAddCustomer = async (e) => {
    if (e) e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setGlobalError("");
      try {
        await userAPI.createCustomer({
          customerName: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          loyalty: formData.loyalty
        });
        setShowForm(false);
        setFormData({ customerName: '', email: '', phone: '', loyalty: 'Bronze' });
        setErrors({});
        loadCustomers();
      } catch (err) {
        setGlobalError("Gagal menyimpan ke Supabase: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const getLoyaltyBadge = (level) => {
    const colors = { 
      Gold: 'bg-gradient-to-r from-yellow-500 to-yellow-600', 
      Silver: 'bg-gradient-to-r from-gray-400 to-gray-500', 
      Bronze: 'bg-gradient-to-r from-orange-500 to-orange-600' 
    };
    const icons = { Gold: '🥇', Silver: '🥈', Bronze: '🥉' };
    return (
      <span className={`${colors[level] || colors.Bronze} text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-sm`}>
        <span>{icons[level] || icons.Bronze}</span>
        <span>{level}</span>
      </span>
    );
  };

  const loyaltyOptions = [
    { value: 'Bronze', color: 'from-orange-500 to-orange-600', icon: '🥉', label: 'Bronze Member', bg: 'bg-orange-50' },
    { value: 'Silver', color: 'from-gray-400 to-gray-500', icon: '🥈', label: 'Silver Member', bg: 'bg-gray-50' },
    { value: 'Gold', color: 'from-yellow-500 to-yellow-600', icon: '🥇', label: 'Gold Member', bg: 'bg-yellow-50' }
  ];

  return (
    <div className="animate-fadeIn">
      <PageHeader 
        title="Customers" 
        breadcrumb={['Dashboard', 'Customers']}
      >
        {/* Tombol Add Customer disesuaikan ke warna Oranye On-Catering */}
        <button 
          onClick={() => setShowForm(true)}
          disabled={loading}
          className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2 font-medium">
            <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
            Add Customer
          </span>
        </button>
      </PageHeader>

      {globalError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r text-sm text-red-700 shadow-sm text-left">
          {globalError}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !loading && setShowForm(false)} />
          
          <form onSubmit={handleAddCustomer} className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform animate-slideUp overflow-hidden border border-gray-100">
            {/* Header Modal - Dibuat bersih dan minimalis sesuai tema On-Catering */}
            <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Tambah Customer</h2>
                <p className="text-gray-400 text-xs mt-0.5">Isi data customer dengan lengkap</p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Input Nama Lengkap */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  disabled={loading}
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-full text-sm focus:outline-none transition-all duration-300 bg-white ${
                    errors.customerName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                  }`}
                  placeholder="Masukkan nama customer"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.customerName}
                  </p>
                )}
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  disabled={loading}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-full text-sm focus:outline-none transition-all duration-300 bg-white ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                  }`}
                  placeholder="customer@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Input Nomor Telepon */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  disabled={loading}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-full text-sm focus:outline-none transition-all duration-300 bg-white ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                  }`}
                  placeholder="081234567890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.phone}
                  </p>
                )}
              </div>

              {/* Level Loyalty */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Level Loyalty
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {loyaltyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      disabled={loading}
                      onClick={() => setFormData({...formData, loyalty: option.value})}
                      className={`relative overflow-hidden p-2.5 rounded-xl transition-all duration-300 border text-center ${
                        formData.loyalty === option.value 
                          ? 'border-orange-500 bg-orange-50 text-orange-600 font-medium shadow-sm' 
                          : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-[11px] font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bagian Tombol Aksi - Dibuat bulat penuh (`rounded-full`) mengikuti UI Sign Up */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setShowForm(false);
                    setErrors({});
                    setFormData({ customerName: '', email: '', phone: '', loyalty: 'Bronze' });
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20"
                >
                  {loading ? (
                    <Loader2 className="animate-spin text-sm" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tabel Data Customers */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Loyalty</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading && customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-400">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin text-xl text-orange-500" />
                      Memuat data customer...
                    </div>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-400">
                    Belum ada data customer terdaftar.
                  </td>
                </tr>
              ) : (
                customers.map((customer, idx) => (
                  <tr key={customer.id || idx} className="hover:bg-gray-50/80 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {customer.id ? `C${String(customer.id).padStart(3, '0')}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{customer.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{customer.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{customer.phone}</td>
                    <td className="px-6 py-4">{getLoyaltyBadge(customer.loyalty)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;