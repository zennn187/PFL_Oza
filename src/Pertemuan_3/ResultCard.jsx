import React from 'react';

const ResultCard = ({ data }) => {
  const { nama, umur, kota, pekerjaan, pendapatan } = data;

  // Fungsi perhitungan/analisis
  const hitungKategoriUsia = () => {
    if (umur < 18) return "Remaja";
    if (umur <= 60) return "Dewasa";
    return "Lansia";
  };

  const hitungStatusEkonomi = () => {
    if (pendapatan < 2000000) return "Kurang Mampu";
    if (pendapatan < 5000000) return "Menengah";
    return "Mampu";
  };

  const hitungRekomendasi = () => {
    if (umur < 18 && pendapatan > 0) return " Fokus pada pendidikan";
    if (pendapatan < 2000000) return " Pertimbangkan pelatihan skill";
    if (pendapatan >= 5000000) return " SudahBaik, pertahankan dan investasikan";
    return " Terus tingkatkan karir";
  };

  return (
    <div className="result-card">
      <h3> Hasil Analisis Data Diri </h3>
      
      <div className="result-item">
        <span className="result-label"> Nama Lengkap : </span>
        <span className="result-value">{nama}</span>
      </div>
      
      <div className="result-item">
        <span className="result-label"> Usia : </span>
        <span className="result-value">{umur} tahun - {hitungKategoriUsia()}</span>
      </div>
      
      <div className="result-item">
        <span className="result-label"> Kota Domisili : </span>
        <span className="result-value">{kota}</span>
      </div>
      
      <div className="result-item">
        <span className="result-label"> Pekerjaan : </span>
        <span className="result-value">{pekerjaan}</span>
      </div> 
      
      <div className="result-item">
        <span className="result-label"> Pendapatan per Bulan : </span>
        <span className="result-value">Rp {pendapatan.toLocaleString('id-ID')}</span>
      </div>
      
      <div className="result-divider"></div>
      
      <div className="result-item">
        <span className="result-label"> Status Ekonomi : </span>
        <span className="result-value status-badge">{hitungStatusEkonomi()}</span>
      </div>
      
      <div className="result-item">
        <span className="result-label"> Rekomendasi : </span>
        <span className="result-value">{hitungRekomendasi()}</span>
      </div>
    </div>
  );
};

export default ResultCard;