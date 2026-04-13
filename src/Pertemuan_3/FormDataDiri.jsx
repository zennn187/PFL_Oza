import React, { useState } from 'react';
import FormField from './FormField';
import ResultCard from './ResultCard';
import './Pertemuan3.css';

const FormDataDiri = () => {
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    kota: '',
    pekerjaan: '',
    pendapatan: ''
  });

  const [errors, setErrors] = useState({
    nama: '',
    umur: '',
    kota: '',
    pekerjaan: '',
    pendapatan: ''
  });

  //  untuk submit dan hasil
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);

  // Data untuk kita milih dropdown kota dan pekerjaan
  const kotaOptions = [
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Surabaya', label: 'Surabaya' },
    { value: 'Bandung', label: 'Bandung' },
    { value: 'Medan', label: 'Medan' },
    { value: 'Semarang', label: 'Semarang' },
    { value: 'Yogyakarta', label: 'Yogyakarta' },
    { value: 'Duri', label: 'Duri' },
    { value: 'Pekanbaru', label: 'Pekanbaru' },
    { value: 'Dumai', label: 'Dumai' },
    { value: 'Padang', label: 'Padang' },
    { value: 'Bukittinggi', label: 'Bukittinggi' },
    { value: 'Aceh', label: 'Aceh' }
  ];

  const pekerjaanOptions = [
    { value: 'Pelajar/Mahasiswa', label: 'Pelajar/Mahasiswa' },
    { value: 'Karyawan Swasta', label: 'Karyawan Swasta' },
    { value: 'PNS/TNI/Polri', label: 'PNS/TNI/Polri' },
    { value: 'Wirausaha', label: 'Wirausaha' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Tidak Bekerja', label: 'Tidak Bekerja' }
  ];

  const validateNama = (value) => {
    if (!value) return 'Nama wajib diisi';
    if (value.length < 3) return 'Nama minimal 3 karakter';
    if (/\d/.test(value)) return 'Nama tidak boleh mengandung angka';
    return '';
  };

  const validateUmur = (value) => {
    if (!value) return 'Usia wajib diisi';
    if (isNaN(value)) return 'Usia harus berupa angka';
    if (value < 1) return 'Usia minimal 1 tahun';
    if (value > 120) return 'Usia maksimal 120 tahun';
    return '';
  };

  const validateKota = (value) => {
    if (!value) return 'Kota domisili wajib dipilih';
    if (value.length < 3) return 'Pilih kota yang valid';
    return '';
  };

  const validatePekerjaan = (value) => {
    if (!value) return 'Pekerjaan wajib dipilih';
    if (value.length < 3) return 'Pilih pekerjaan yang valid';
    return '';
  };

  const validatePendapatan = (value) => {
    if (!value) return 'Pendapatan wajib diisi';
    if (isNaN(value)) return 'Pendapatan harus berupa angka';
    if (value < 0) return 'Pendapatan tidak boleh negatif';
    if (value > 100000000) return 'Pendapatan maksimal Rp 100.000.000';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    let error = '';
    switch (name) {
      case 'nama': error = validateNama(value); break;
      case 'umur': error = validateUmur(value); break;
      case 'kota': error = validateKota(value); break;
      case 'pekerjaan': error = validatePekerjaan(value); break;
      case 'pendapatan': error = validatePendapatan(value); break;
      default: break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    
    if (isSubmitted) setIsSubmitted(false);
  };

  const isFormValid = () => {
    const newErrors = {
      nama: validateNama(formData.nama),
      umur: validateUmur(formData.umur),
      kota: validateKota(formData.kota),
      pekerjaan: validatePekerjaan(formData.pekerjaan),
      pendapatan: validatePendapatan(formData.pendapatan)
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid()) {
      setResultData({
        nama: formData.nama,
        umur: parseInt(formData.umur),
        kota: formData.kota,
        pekerjaan: formData.pekerjaan,
        pendapatan: parseInt(formData.pendapatan)
      });
      setIsSubmitted(true);
    }
  };

  const allFieldsFilled = formData.nama && formData.umur && formData.kota && 
                          formData.pekerjaan && formData.pendapatan;
  const noErrors = Object.values(errors).every(error => error === '');
  const showSubmitButton = allFieldsFilled && noErrors;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2> Form Data Diri </h2>
        <p>Isi data diri Anda dengan lengkap untuk mendapatkan analisis</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 3 Inputan */}
        <FormField
          label="Nama Lengkap"
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Contoh: Oza Okta Gistrada"
          error={errors.nama}
        />

        <FormField
          label="Usia"
          type="number"
          name="umur"
          value={formData.umur}
          onChange={handleChange}
          placeholder="Contoh: 25"
          error={errors.umur}
        />

        <FormField
          label="Pendapatan per Bulan"
          type="number"
          name="pendapatan"
          value={formData.pendapatan}
          onChange={handleChange}
          placeholder="Contoh: 5000000"
          error={errors.pendapatan}
        />

        <FormField
          label="Kota Domisili"
          type="select"
          name="kota"
          value={formData.kota}
          onChange={handleChange}
          options={kotaOptions}
          error={errors.kota}
        />

        <FormField
          label="Pekerjaan"
          type="select"
          name="pekerjaan"
          value={formData.pekerjaan}
          onChange={handleChange}
          options={pekerjaanOptions}
          error={errors.pekerjaan}
        />

        {showSubmitButton && (
          <button type="submit" className="submit-btn">
            Simpan Data
          </button>
        )}
      </form>

      {isSubmitted && resultData && (
        <ResultCard data={resultData} />
      )}
    </div>
  );
};

export default FormDataDiri;