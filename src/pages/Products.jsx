import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsRawData from '../data/productsData.json';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Memastikan data terisi saat komponen dimuat
    setProducts(productsRawData);
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Daftar Inventaris Produk</h2>
        <span style={{ fontSize: '14px', color: '#666' }}>Total: {products.length} Item</span>
      </div>
      
      {/* Container dengan Scrollbar jika data lebih dari 30 */}
      <div style={{ 
        maxHeight: '70vh', 
        overflowY: 'auto', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead style={{ 
            backgroundColor: '#f8f9fa', 
            position: 'sticky', 
            top: 0, 
            zIndex: 1,
            boxShadow: '0 1px 0 #ddd' 
          }}>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nama Produk</th>
              <th style={styles.th}>Kategori</th>
              <th style={styles.th}>Harga</th>
              <th style={styles.th}>Stok</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(({ id, nama, kategori, harga, stok }) => (
                <tr key={id} style={styles.tr}>
                  <td style={styles.td}>{id}</td>
                  <td style={{ ...styles.td, fontWeight: 'bold' }}>
                    <Link to={`/products/${id}`} className="text-black hover:text-[#EA6A12] transition-colors duration-200">
                      {nama}
                    </Link>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{kategori}</span>
                  </td>
                  <td style={styles.td}>{formatRupiah(harga)}</td>
                  <td style={{ ...styles.td, color: stok < 10 ? 'red' : 'inherit' }}>
                    {stok} pcs {stok < 10 && '(Stok Tipis)'}
                  </td>
                  <td style={styles.td}>
                    <button style={styles.btnEdit}>Edit</button>
                    <button style={styles.btnDelete}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Data produk tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Objek Styles untuk menjaga kerapihan kode JSX
const styles = {
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    color: '#555',
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
    verticalAlign: 'middle'
  },
  tr: {
    transition: 'background 0.2s',
    cursor: 'default'
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  btnEdit: {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#ffc107',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  btnDelete: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};

export default Products;