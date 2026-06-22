import React from 'react';
import { useCart } from '../lib/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative">
      <div>
        <div className="w-full h-32 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.description}</p>
      </div>
      <div className="flex items-center justify-between mt-6">
        <span className="text-orange-500 font-bold text-lg">{formatRupiah(product.price)}</span>
        <button 
          onClick={() => addToCart(product)}
          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl hover:bg-orange-500 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;