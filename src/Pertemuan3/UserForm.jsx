import React, { useState } from 'react';

export default function UserForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    tanggalLahir: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Simpan:", formData);
    alert("Data Berhasil Disimpan!");
  };

  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Tambah User</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Nama Field */}
          <label className="block text-gray-700 font-medium">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan Nama"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          {/* Email Field */}
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan Email"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          {/* Tanggal Lahir Field */}
          <label className="block text-gray-700 font-medium">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <button 
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}