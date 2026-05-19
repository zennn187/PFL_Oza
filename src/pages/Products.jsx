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

  const tableHeaders = ["ID", "Nama Produk", "Kategori", "Harga", "Stok", "Aksi"];

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-800">Daftar Inventaris Produk</h2>
          <p className="text-xs text-gray-500 mt-0.5">Kelola data menu dan ketersediaan stok restoran.</p>
        </div>
        <span className="text-xs bg-orange-50 text-[#FF6B35] font-bold px-3 py-1.5 rounded-xl">
          Total: {products.length} Item
        </span>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[70vh] overflow-y-auto">
        <Table headers={tableHeaders}>
          {products.length > 0 ? (
            products.map(({ id, nama, kategori, harga, stok }) => (
              <tr key={id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{id}</td>
                <td className="px-6 py-4 font-bold text-gray-800">
                  <Link to={`/products/${id}`} className="text-gray-800 hover:text-[#FF6B35] transition-colors">
                    {nama}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Badge type="primary">{kategori}</Badge>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{formatRupiah(harga)}</td>
                <td className={`px-6 py-4 text-xs font-semibold ${stok < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                  {stok} pcs {stok < 10 && <span className="ml-1 text-[10px] bg-red-50 px-1.5 py-0.5 rounded font-bold animate-pulse">(Stok Tipis)</span>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button type="warning">Edit</Button>
                    <Button type="danger">Hapus</Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-10 text-sm text-gray-400">
                Data produk tidak ditemukan.
              </td>
            </tr>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Products;