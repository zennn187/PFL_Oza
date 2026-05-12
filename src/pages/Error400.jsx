import React from 'react';
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Error400 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-[32px] p-10 md:p-14 max-w-md w-full text-center shadow-sm border border-gray-100 flex flex-col items-center animate-fadeInUp">
            
            {/* Ikon Box Pastel */}
            <div className="w-24 h-24 bg-red-50 rounded-[24px] flex items-center justify-center mb-8 -rotate-3 hover:rotate-0 transition-transform duration-300">
                <FaExclamationCircle className="text-5xl text-red-500 rotate-3" />
            </div>

            {/* Teks 400 */}
            <h1 className="text-7xl font-extrabold text-gray-800 mb-2 tracking-tight">
                400
            </h1>
            
            {/* Pesan Error */}
            <h2 className="text-xl font-bold text-gray-700 mb-3">
                Bad Request
            </h2>
            
            <p className="text-gray-500 mb-10 text-sm font-medium leading-relaxed">
                Permintaan tidak dapat diproses oleh server karena format yang tidak valid. Silakan periksa kembali data Anda.
            </p>

            {/* Tombol Kembali */}
            <Link 
                to={-1} 
                className="flex items-center justify-center gap-2 w-full py-4 bg-gray-800 hover:bg-gray-900 active:bg-black text-white rounded-2xl font-bold transition-all shadow-md shadow-gray-800/30"
            >
                <FaArrowLeft className="text-sm" />
                Go Back
            </Link>
        </div>
    </div>
  );
};

export default Error400;