import React from 'react';
import ErrorPage from '../components/ErrorPage';

const Error401 = () => {
  return (
    <ErrorPage 
      errorCode="401" 
      errorDescription="Unauthorized - Anda perlu login untuk mengakses halaman ini" 
      errorImage="https://http.cat/401"
    />
  );
};

export default Error401;