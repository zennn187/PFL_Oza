import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ordersData from '../data/ordersData.json';
import { X, User, Package, DollarSign, Calendar, Save, Ban, PlusCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const Orders = () => {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState(ordersData);
  const [formData, setFormData] = useState({
    customerName: '', status: 'Pending', totalPrice: '', orderDate: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Nama customer wajib diisi';
    if (!formData.totalPrice) {
      newErrors.totalPrice = 'Total price wajib diisi';
    } else if (isNaN(formData.totalPrice) || formData.totalPrice <= 0) {
      newErrors.totalPrice = 'Total price harus angka positif';
    }
    if (!formData.orderDate) newErrors.orderDate = 'Tanggal order wajib diisi';
    return newErrors;
  };

  const handleAddOrder = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const newOrder = {
        orderId: `ORD${String(orders.length + 1).padStart(3, '0')}`,
        ...formData,
        totalPrice: Number(formData.totalPrice)
      };
      setOrders([...orders, newOrder]);
      setShowForm(false);
      setFormData({ customerName: '', status: 'Pending', totalPrice: '', orderDate: '' });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      Completed: { color: 'from-green-500 to-green-600', icon: <CheckCircle size={14} />, label: 'Completed' },
      Pending: { color: 'from-yellow-500 to-yellow-600', icon: <Clock size={14} />, label: 'Pending' },
      Cancelled: { color: 'from-red-500 to-red-600', icon: <XCircle size={14} />, label: 'Cancelled' }
    };
    const { color, icon, label } = config[status];
    return (
      <span className={`bg-gradient-to-r ${color} text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-md`}>
        {icon}
        {label}
      </span>
    );
  };

  const statusOptions = [
    { value: 'Pending', icon: <Clock size={16} />, color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50' },
    { value: 'Completed', icon: <CheckCircle size={16} />, color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
    { value: 'Cancelled', icon: <XCircle size={16} />, color: 'from-red-500 to-red-600', bg: 'bg-red-50' }
  ];

  return (
    <div className="animate-fadeIn">
      <PageHeader 
        title="Orders" 
        breadcrumb={['Dashboard', 'Orders']}
      >
        <button 
          onClick={() => setShowForm(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            <PlusCircle size={18} className="group-hover:rotate-12 transition-transform" />
            Add Order
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="absolute top-0 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative px-6 py-5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Package size={24} />
                    Tambah Order
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">Isi detail order dengan lengkap</p>
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
                  <User size={16} className="inline mr-2 text-blue-500" />
                  Nama Customer
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50
                      ${errors.customerName 
                        ? 'border-red-500 focus:border-red-500 animate-shake' 
                        : 'border-gray-200 focus:border-blue-500'
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

              {/* Status dengan Desain Card */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Package size={16} className="inline mr-2 text-blue-500" />
                  Status Order
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, status: option.value})}
                      className={`relative overflow-hidden p-3 rounded-xl transition-all duration-300 transform hover:scale-105
                        ${formData.status === option.value 
                          ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105` 
                          : `${option.bg} text-gray-600 hover:bg-gray-100 border-2 border-transparent`
                        }`}
                    >
                      <div className="flex justify-center mb-1">{option.icon}</div>
                      <div className="text-xs font-semibold">{option.value}</div>
                      {formData.status === option.value && (
                        <div className="absolute inset-0 border-2 border-white rounded-xl animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign size={16} className="inline mr-2 text-blue-500" />
                  Total Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.totalPrice}
                    onChange={(e) => setFormData({...formData, totalPrice: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50
                      ${errors.totalPrice 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                      }`}
                    placeholder="0"
                  />
                  <DollarSign size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.totalPrice && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.totalPrice}
                  </p>
                )}
              </div>

              {/* Order Date */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2 text-blue-500" />
                  Order Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50
                      ${errors.orderDate 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                      }`}
                  />
                  <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.orderDate && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.orderDate}
                  </p>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setErrors({});
                    setFormData({ customerName: '', status: 'Pending', totalPrice: '', orderDate: '' });
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Ban size={18} />
                  Batal
                </button>
                <button
                  onClick={handleAddOrder}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save size={18} />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Order dengan Desain Modern */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{order.customerName}</td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;