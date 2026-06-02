import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsRawData from '../data/productsData.json';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsRawData);
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Helper utk menentukan satuan dinamis berdasarkan kategori atau nama produk
  const getSatuan = (kategori, nama) => {
    const namaLower = nama.toLowerCase();
    if (kategori === "Bahan Baku") {
      if (namaLower.includes("botol")) return "Botol";
      if (namaLower.includes("2l") || namaLower.includes("liter")) return "Pouch";
      return "Kg";
    }
    if (kategori === "Minuman") {
      if (namaLower.includes("galon")) return "Galon";
      if (namaLower.includes("dus")) return "Dus";
      if (namaLower.includes("pitcher")) return "Pitcher";
      return "Botol";
    }
    if (kategori === "Operasional Dapur") {
      if (namaLower.includes("box") || namaLower.includes("kardus")) return "Pcs";
      if (namaLower.includes("sendok")) return "Set";
      return "Tabung"; // Untuk Gas Elpiji
    }
    return "Porsi"; // Default untuk Nasi Kotak & Paket Prasmanan
  };

  const tableHeaders = ["ID", "Nama Menu / Item", "Kategori", "Harga Satuan", "Stok Lapangan", "Aksi"];

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-800">Daftar Inventaris & Logistik</h2>
          <p className="text-xs text-gray-500 mt-0.5">Pantau stok bahan baku dapur sm menu paket katering On-Catering.</p>
        </div>
        <span className="text-xs bg-orange-50 text-[#FF6B35] font-bold px-3 py-1.5 rounded-xl border border-orange-100">
          Total: {products.length} Komoditas
        </span>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[70vh] overflow-y-auto">
        <Table headers={tableHeaders}>
          {products.length > 0 ? (
            products.map(({ id, nama, kategori, harga, stok }) => {
              // Logika batas minimal stok tipis dibuat dinamis
              // Bahan baku segar/gas kalau di bawah 15 sudah termasuk tipis, sedangkan porsi katering di bawah 30
              const isStokTipis = kategori === "Bahan Baku" || kategori === "Operasional Dapur" ? stok < 15 : stok < 30;
              const satuan = getSatuan(kategori, nama);

              return (
                <tr key={id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">#{String(id).padStart(3, '0')}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    <Link to={`/products/${id}`} className="text-gray-800 hover:text-[#FF6B35] transition-colors">
                      {nama}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Badge type={
                      kategori === "Bahan Baku" ? "warning" : 
                      kategori === "Operasional Dapur" ? "dark" : "primary"
                    }>
                      {kategori}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatRupiah(harga)}</td>
                  <td className={`px-6 py-4 text-xs font-semibold ${isStokTipis ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                    {stok.toLocaleString('id-ID')} {satuan} 
                    {isStokTipis && (
                      <span className="ml-2 text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-bold inline-block border border-red-100 animate-pulse">
                        (Stok Menipis)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button type="warning">Edit</Button>
                      <Button type="danger">Hapus</Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-10 text-sm text-gray-400">
                Data inventaris katering tidak ditemukan.
              </td>
            </tr>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Products;