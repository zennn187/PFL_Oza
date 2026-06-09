import React, { useState, useMemo } from "react";
import transactionsData from "../data/transactionsData.json";

function DataPelanggan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const stats = useMemo(() => {
    const totalRevenue = transactionsData.reduce((sum, item) => sum + item.total_transaksi, 0);
    const totalOrders = transactionsData.length;
    const uniqueCustomers = new Set(transactionsData.map(item => item.nama_pelanggan)).size;
    const avgTransaction = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const allTotals = transactionsData.map(item => item.total_transaksi);
    const maxTransaction = allTotals.length > 0 ? Math.max(...allTotals) : 0;
    const minTransaction = allTotals.length > 0 ? Math.min(...allTotals) : 0;

    return {
      totalRevenue,
      totalOrders,
      uniqueCustomers,
      avgTransaction,
      maxTransaction,
      minTransaction
    };
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const filteredTransactions = useMemo(() => {
    let result = transactionsData.filter((item) => {
      const matchesSearch = 
        item.nama_pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.id_transaksi.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.produk_dibeli.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPayment = paymentFilter === "Semua" || item.metode_pembayaran === paymentFilter;
      
      return matchesSearch && matchesPayment;
    });

    if (sortField) {
      result.sort((a, b) => {
        let valueA = a[sortField];
        let valueB = b[sortField];

        if (sortField === "frekuensi_pembelian") {
          valueA = parseInt(a.frekuensi_pembelian) || 0;
          valueB = parseInt(b.frekuensi_pembelian) || 0;
        }

        if (sortField === "tanggal_terakhir") {
          const partsA = a.tanggal_terakhir.split("/");
          const partsB = b.tanggal_terakhir.split("/");
          valueA = new Date(partsA[2], partsA[1] - 1, partsA[0]).getTime();
          valueB = new Date(partsB[2], partsB[1] - 1, partsB[0]).getTime();
        }

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchTerm, paymentFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const displayedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPaymentFilter("Semua");
    setSortField("");
    setSortDirection("asc");
    setCurrentPage(1);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const getCustomerBadge = (frequencyStr) => {
    const freq = parseInt(frequencyStr) || 0;
    if (freq >= 12) {
      return <span className="bg-purple-50 text-purple-600 text-xs font-semibold px-2.5 py-1 rounded-md">VIP / Loyal</span>;
    } else if (freq >= 6) {
      return <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-md">Regular</span>;
    } else {
      return <span className="bg-gray-50 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-md">New Customer</span>;
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#F8F9FA] min-h-screen">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Modul CRM & Analisis Data Transaksi</h1>
          <p className="text-sm text-gray-500 mt-1">Mengelola ringkasan interaksi dan transaksi individu untuk optimalisasi layanan On-Catering.</p>
        </div>
        <div className="text-xs bg-orange-50 text-orange-600 border border-orange-200/60 px-4 py-2 rounded-full font-bold shadow-sm self-start sm:self-center">
          Total Database: {transactionsData.length} Baris
        </div>
      </div>

      {/* Grid KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Pendapatan</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">{formatRupiah(stats.totalRevenue)}</p>
            <span className="inline-block text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded mt-2">Analytical CRM Metric</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-between text-emerald-500 font-bold text-xl justify-center">💰</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaksi Sukses</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">{stats.totalOrders} Transaksi</p>
            <span className="inline-block text-[10px] bg-orange-50 text-orange-600 font-bold px-2 py-0.5 rounded mt-2">Operational Record</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-between text-orange-500 font-bold text-xl justify-center">📦</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pelanggan Unik</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">{stats.uniqueCustomers} Individu</p>
            <span className="inline-block text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded mt-2">CRM Segment</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-between text-blue-500 font-bold text-xl justify-center">👥</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rata-rata Pembelian</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">{formatRupiah(stats.avgTransaction)}</p>
            <span className="inline-block text-[10px] bg-purple-50 text-purple-600 font-bold px-2 py-0.5 rounded mt-2">Strategic Insight</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-between text-purple-500 font-bold text-xl justify-center">📈</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaksi Tertinggi</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5 text-emerald-600">{formatRupiah(stats.maxTransaction)}</p>
            <span className="inline-block text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded mt-2">Peak Revenue</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-between text-emerald-600 font-bold text-xl justify-center">🔥</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaksi Terendah</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5">{formatRupiah(stats.minTransaction)}</p>
            <span className="inline-block text-[10px] bg-gray-50 text-gray-500 font-bold px-2 py-0.5 rounded mt-2">Minimum Base</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-between text-gray-500 font-bold text-xl justify-center">📉</div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Filter Area */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center bg-white">
          <div className="w-full lg:w-96">
            <input
              type="text"
              placeholder="Cari ID, nama pelanggan, atau menu..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-gray-800 placeholder-gray-400 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Tampilkan:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value={10}>10 Baris</option>
                <option value={25}>25 Baris</option>
                <option value={50}>50 Baris</option>
                <option value={100}>100 Baris</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Metode:</span>
              <select
                value={paymentFilter}
                onChange={(e) => {
                  setPaymentFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="Semua">Semua Pembayaran</option>
                <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                <option value="Transfer Bank BRI">Transfer Bank BRI</option>
                <option value="E-Wallet (OVO/Dana)">E-Wallet (OVO/Dana)</option>
                <option value="QRIS">QRIS</option>
                <option value="Tunai / COD">Tunai / COD</option>
              </select>
            </div>

            {(searchTerm || paymentFilter !== "Semua" || sortField) && (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-all"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Responsive Canvas Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider select-none">
                <th onClick={() => handleSort("id_transaksi")} className="p-4 text-center cursor-pointer hover:bg-gray-100/70 transition-colors">
                  ID Transaksi <span className="ml-1 text-gray-400 font-mono">{getSortIcon("id_transaksi")}</span>
                </th>
                <th onClick={() => handleSort("nama_pelanggan")} className="p-4 cursor-pointer hover:bg-gray-100/70 transition-colors">
                  Nama Pelanggan <span className="ml-1 text-gray-400 font-mono">{getSortIcon("nama_pelanggan")}</span>
                </th>
                <th onClick={() => handleSort("frekuensi_pembelian")} className="p-4 text-center cursor-pointer hover:bg-gray-100/70 transition-colors">
                  Frekuensi <span className="ml-1 text-gray-400 font-mono">{getSortIcon("frekuensi_pembelian")}</span>
                </th>
                <th className="p-4">Segmentasi CRM</th>
                <th className="p-4">Menu / Produk Terbeli</th>
                <th onClick={() => handleSort("total_transaksi")} className="p-4 text-right cursor-pointer hover:bg-gray-100/70 transition-colors">
                  Total Nominal <span className="ml-1 text-gray-400 font-mono">{getSortIcon("total_transaksi")}</span>
                </th>
                <th className="p-4">Metode Bayar</th>
                <th onClick={() => handleSort("tanggal_terakhir")} className="p-4 text-center cursor-pointer hover:bg-gray-100/70 transition-colors">
                  Tanggal Transaksi <span className="ml-1 text-gray-400 font-mono">{getSortIcon("tanggal_terakhir")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 text-gray-700">
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((tx) => (
                  <tr key={tx.id_transaksi} className="hover:bg-gray-50/50 transition-colors bg-white">
                    <td className="p-4 text-center font-mono font-medium text-gray-400 text-xs">{tx.id_transaksi}</td>
                    <td className="p-4 font-bold text-gray-900">{tx.nama_pelanggan}</td>
                    <td className="p-4 text-center">
                      <span className="bg-gray-50 px-2 py-1 rounded text-xs font-semibold text-gray-600">
                        {tx.frekuensi_pembelian}
                      </span>
                    </td>
                    <td className="p-4">{getCustomerBadge(tx.frekuensi_pembelian)}</td>
                    <td className="p-4 text-xs text-gray-500 max-w-xs truncate" title={tx.produk_dibeli}>
                      {tx.produk_dibeli}
                    </td>
                    <td className="p-4 text-right font-bold text-gray-900">{formatRupiah(tx.total_transaksi)}</td>
                    <td className="p-4 text-xs font-medium text-gray-600">{tx.metode_pembayaran}</td>
                    <td className="p-4 text-center text-xs text-gray-500 font-medium">{tx.tanggal_terakhir}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-16 text-center text-gray-400 bg-white font-medium text-sm">
                    Tidak ada data transaksi pencarian yang cocok dengan kriteria filter Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredTransactions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-t border-gray-100 gap-4 bg-white">
            <p className="text-xs text-gray-400 font-medium">
              Menampilkan {Math.min(filteredTransactions.length, (currentPage - 1) * itemsPerPage + 1)} -{" "}
              {Math.min(filteredTransactions.length, currentPage * itemsPerPage)} dari {filteredTransactions.length} data tersaring
            </p>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                Sebelumnya
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage;
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-semibold border transition-all ${currentPage === pageNum ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataPelanggan;   