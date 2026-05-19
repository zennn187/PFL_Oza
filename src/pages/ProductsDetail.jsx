import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(response.message);
          return;
        }
        setProduct(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto mt-10">
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 text-sm font-medium text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-sm font-medium text-gray-400 animate-pulse">
          Loading product records...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50/50">
      <div className="mb-6 max-w-xl mx-auto">
        <Link to="/products">
          <Button type="secondary">&larr; Back to Inventory</Button>
        </Link>
      </div>

      <Card className="max-w-xl mx-auto overflow-hidden !p-0 border border-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover border-b border-gray-50"
        />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">Product ID: #{id}</span>
            <Badge type="success">{product.category}</Badge>
          </div>
          
          <div>
            <h2 className="text-2xl font-black text-gray-800">{product.title}</h2>
            <p className="text-xs text-gray-400 mt-1">Brand Provider: <span className="font-semibold text-gray-600">{product.brand || "Local Resto"}</span></p>
          </div>

          <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Price Rate</p>
              <p className="text-2xl font-black text-[#FF6B35]">
                Rp {(product.price * 1000).toLocaleString('id-ID')}
              </p>
            </div>
            <Button type="primary">Update Stock</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}