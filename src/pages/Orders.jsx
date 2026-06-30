import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ordersData from '../data/ordersData.json';
import { X, User, Package, DollarSign, Calendar, Save, Ban, PlusCircle, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { hitungPoin, tentukanTier } from '../lib/pointUtils';
import { useAuth } from '../context/useAuth';

const statusToDb = {
  Pending: 'pending',
  Processing: 'processing',
  Shipped: 'shipped',
  Completed: 'completed',
  Cancelled: 'cancelled',
};

const statusToUi = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const normalizeOrder = (order) => ({
  id: order.id || order.orderId,
  orderId: order.nomor_pesanan || order.orderId,
  customerId: order.user_id,
  customerName: order.profiles?.nama_lengkap || order.customerName || 'Member',
  status: statusToUi[order.status] || order.status || 'Pending',
  totalPrice: Number(order.total_harga ?? order.totalPrice) || 0,
  orderDate: order.created_at || order.orderDate,
  poinDiberikan: Number(order.poin_diberikan || 0),
  isRemote: Boolean(order.nomor_pesanan),
});

const Orders = () => {
  const { profile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [formData, setFormData] = useState({
    customerName: '', status: 'Pending', totalPrice: '', orderDate: ''
  });
  const [errors, setErrors] = useState({});

  const loadOrders = async () => {
    setLoading(true);
    setGlobalError('');

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, nomor_pesanan, user_id, status, total_harga, poin_diberikan, created_at, profiles(nama_lengkap, email)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders((data || []).map(normalizeOrder));
    } catch (err) {
      setOrders(ordersData.map(normalizeOrder));
      setGlobalError(`Gagal mengambil data Supabase, menampilkan data lokal: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

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
        id: `LOCAL-${Date.now()}`,
        orderId: `ORD${String(orders.length + 1).padStart(3, '0')}`,
        ...formData,
        totalPrice: Number(formData.totalPrice),
        isRemote: false,
      };
      setOrders([newOrder, ...orders]);
      setShowForm(false);
      setFormData({ customerName: '', status: 'Pending', totalPrice: '', orderDate: '' });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleCompleteOrder = async (order) => {
    if (!order.customerId) {
      throw new Error('Order tidak memiliki customerId sehingga poin tidak dapat diberikan.');
    }

    const { data: pointData, error: pointError } = await supabase
      .from('member_points')
      .select('tier, lifetime_points, total_points')
      .eq('user_id', order.customerId)
      .single();

    if (pointError) throw pointError;

    const tierAktif = pointData?.tier || 'bronze';
    const perolehanPoin = hitungPoin(order.totalPrice, tierAktif);

    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'completed', poin_diberikan: perolehanPoin })
      .eq('id', order.id);

    if (orderError) throw orderError;

    const newLifetime = Number(pointData.lifetime_points || 0) + perolehanPoin;
    const newTotal = Number(pointData.total_points || 0) + perolehanPoin;
    const tierBaru = tentukanTier(newLifetime);

    const { error: updatePointError } = await supabase
      .from('member_points')
      .update({ total_points: newTotal, lifetime_points: newLifetime, tier: tierBaru })
      .eq('user_id', order.customerId);

    if (updatePointError) throw updatePointError;

    const { error: logError } = await supabase.from('point_transactions').insert([
      {
        user_id: order.customerId,
        order_id: order.id,
        jumlah_poin: perolehanPoin,
        jenis: 'credit',
        keterangan: `Hadiah poin transaksi completed nomor pesanan ${order.orderId}`,
      },
    ]);

    if (logError) throw logError;

    if (tierBaru !== tierAktif) {
      const { error: tierError } = await supabase.from('tier_history').insert([
        {
          user_id: order.customerId,
          tier_lama: tierAktif,
          tier_baru: tierBaru,
        },
      ]);

      if (tierError) throw tierError;
    }
  };

  const handleStatusChange = async (order, nextStatus) => {
    if (!order.isRemote) {
      setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status: nextStatus } : item));
      return;
    }

    setLoading(true);
    setGlobalError('');

    try {
      if (nextStatus === 'Completed' && order.status !== 'Completed' && order.poinDiberikan === 0) {
        await handleCompleteOrder(order);
      } else {
        const { error } = await supabase
          .from('orders')
          .update({ status: statusToDb[nextStatus] })
          .eq('id', order.id);
        if (error) throw error;
      }

      await loadOrders();
    } catch (err) {
      const message = `Proses update status pesanan gagal: ${err.message}`;
      setGlobalError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      Completed: { color: 'from-green-500 to-green-600', icon: <CheckCircle size={14} />, label: 'Completed' },
      Processing: { color: 'from-blue-500 to-blue-600', icon: <Package size={14} />, label: 'Processing' },
      Shipped: { color: 'from-indigo-500 to-indigo-600', icon: <Package size={14} />, label: 'Shipped' },
      Pending: { color: 'from-yellow-500 to-yellow-600', icon: <Clock size={14} />, label: 'Pending' },
      Cancelled: { color: 'from-red-500 to-red-600', icon: <XCircle size={14} />, label: 'Cancelled' },
    };
    const { color, icon, label } = config[status] || config.Pending;
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

      {globalError && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {globalError}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-slideUp overflow-hidden">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"></div>
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

            <div className="p-6 space-y-5">
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50 ${errors.customerName ? 'border-red-500 focus:border-red-500 animate-shake' : 'border-gray-200 focus:border-blue-500'}`}
                    placeholder="Masukkan nama customer"
                  />
                  <User size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
              </div>

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
                      className={`relative overflow-hidden p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${formData.status === option.value ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105` : `${option.bg} text-gray-600 hover:bg-gray-100 border-2 border-transparent`}`}
                    >
                      <div className="flex justify-center mb-1">{option.icon}</div>
                      <div className="text-xs font-semibold">{option.value}</div>
                    </button>
                  ))}
                </div>
              </div>

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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50 ${errors.totalPrice ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                    placeholder="0"
                  />
                  <DollarSign size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.totalPrice && <p className="text-red-500 text-xs mt-1">{errors.totalPrice}</p>}
              </div>

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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50/50 ${errors.orderDate ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                  />
                  <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.orderDate && <p className="text-red-500 text-xs mt-1">{errors.orderDate}</p>}
              </div>

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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-400">
                    <Loader2 className="inline h-5 w-5 animate-spin text-blue-500" /> Memuat pesanan...
                  </td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
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
                  <td className="px-6 py-4">
                    {profile?.role === 'admin' ? (
                      <select
                        value={order.status}
                        disabled={loading}
                        onChange={(event) => handleStatusChange(order, event.target.value)}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    ) : (
                      <span className="text-xs text-gray-400">Readonly</span>
                    )}
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
