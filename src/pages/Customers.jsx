import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import customersData from '../data/customersData.json';
import { X, User, Mail, Phone, Award, Save, Ban, UserPlus } from 'lucide-react';

const Customers = () => {
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState(customersData);
  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', loyalty: 'Bronze'
  });
  const [errors, setErrors] = useState({});

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

  const handleAddCustomer = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const newCustomer = {
        customerId: `C${String(customers.length + 1).padStart(3, '0')}`,
        ...formData
      };
      setCustomers([...customers, newCustomer]);
      setShowForm(false);
      setFormData({ customerName: '', email: '', phone: '', loyalty: 'Bronze' });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const getLoyaltyBadge = (level) => {
    const colors = { 
      Gold: 'bg-gradient-to-r from-yellow-500 to-yellow-600', 
      Silver: 'bg-gradient-to-r from-gray-400 to-gray-500', 
      Bronze: 'bg-gradient-to-r from-orange-600 to-orange-700' 
    };
    const icons = { Gold: '🥇', Silver: '🥈', Bronze: '🥉' };
    return (
      <span className={`${colors[level]} text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-md`}>
        <span>{icons[level]}</span>
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
        <button 
          onClick={() => setShowForm(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
            Add Customer
          </span>
        </button>
      </PageHeader>

      {/* Modal Form yang Menarik */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-slideUp overflow-hidden">
            {/* Header dengan Gradien */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="absolute top-0 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative px-6 py-5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <UserPlus size={24} />
                    Tambah Customer
                  </h2>
                  <p className="text-green-100 text-sm mt-1">Isi data customer dengan lengkap</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              {/* Nama Customer */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="inline mr-2 text-green-500" />
                  Nama Lengkap
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50
                      ${errors.customerName 
                        ? 'border-red-500 focus:border-red-500 animate-shake' 
                        : 'border-gray-200 focus:border-green-500'
                      }`}
                    placeholder="Masukkan nama customer"
                  />
                  <User size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.customerName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.customerName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2 text-green-500" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50
                      ${errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-green-500'
                      }`}
                    placeholder="customer@example.com"
                  />
                  <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2 text-green-500" />
                  Nomor Telepon
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50
                      ${errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-green-500'
                      }`}
                    placeholder="081234567890"
                  />
                  <Phone size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.phone}
                  </p>
                )}
              </div>

              {/* Loyalty Level dengan Desain Card */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Award size={16} className="inline mr-2 text-green-500" />
                  Level Loyalty
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {loyaltyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, loyalty: option.value})}
                      className={`relative overflow-hidden p-3 rounded-xl transition-all duration-300 transform hover:scale-105
                        ${formData.loyalty === option.value 
                          ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105` 
                          : `${option.bg} text-gray-600 hover:bg-gray-100 border-2 border-transparent`
                        }`}
                    >
                      <div className="text-3xl mb-1">{option.icon}</div>
                      <div className="text-xs font-semibold">{option.label}</div>
                      {formData.loyalty === option.value && (
                        <div className="absolute inset-0 border-2 border-white rounded-xl animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setErrors({});
                    setFormData({ customerName: '', email: '', phone: '', loyalty: 'Bronze' });
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Ban size={18} />
                  Batal
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save size={18} />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Customer dengan Desain Modern */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loyalty</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {customers.map((customer, idx) => (
                <tr key={customer.customerId} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.customerId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{customer.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{customer.phone}</td>
                  <td className="px-6 py-4">{getLoyaltyBadge(customer.loyalty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;