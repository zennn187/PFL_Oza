import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode, errorDescription, errorImage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <img 
        src={errorImage || `https://http.cat/${errorCode}`} 
        alt={`Error ${errorCode}`}
        className="w-96 h-auto mb-8"
      />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">{errorCode}</h1>
      <p className="text-xl text-gray-600 mb-8">{errorDescription}</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default ErrorPage;