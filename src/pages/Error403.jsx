import React from 'react';
import ErrorPage from '../components/ErrorPage';

const Error403 = () => {
  return (
    <ErrorPage 
      errorCode="403" 
      errorDescription="Forbidden - Anda tidak memiliki izin untuk mengakses halaman ini" 
      errorImage="https://http.cat/403"
    />
  );
};

export default Error403;