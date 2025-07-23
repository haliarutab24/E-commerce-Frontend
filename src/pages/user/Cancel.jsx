import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Transaction Cancelled</h1>
      <button
        onClick={() => navigate("/products")}
        className="mt-4 px-6 py-3 bg-primary text-white rounded-lg text-lg font-semibold shadow hover:bg-primary-dark transition"
      >
        Back to Shop
      </button>
    </div>
  );
};

export default Cancel;
