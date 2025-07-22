// src/pages/user/SingleProduct.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added "${product.name}" to cart!`);
    // Here you would update cart state/context
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col md:flex-row gap-10">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md h-80 object-cover rounded shadow"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-primary text-2xl font-semibold mb-2">₹{product.price}</p>
        <p className="text-gray-500 mb-2">Category: {product.category}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <span
          className={`inline-block mb-4 text-sm font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-6 py-2 rounded bg-primary text-white font-semibold transition hover:bg-primary-dark ${
              product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add to Cart
          </button>
          <Link
            to="/products"
            className="px-6 py-2 rounded border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
