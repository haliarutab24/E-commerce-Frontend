// src/pages/user/Checkout.jsx
import React, { useState } from "react";
import {products} from "../../data/products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment successful! 🎉");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col md:flex-row gap-10">
      {/* Payment Form */}
      <div className="flex-1 max-w-lg mx-auto bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Checkout</h2>
        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name on Card</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-primary"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-primary"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Card Number</label>
            <input
              type="text"
              name="card"
              value={form.card}
              onChange={handleChange}
              required
              maxLength={19}
              className="w-full border rounded px-3 py-2 focus:outline-primary"
              placeholder="4242 4242 4242 4242"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Expiry</label>
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                required
                maxLength={5}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">CVC</label>
              <input
                type="text"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                required
                maxLength={4}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
                placeholder="123"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded font-semibold mt-4 hover:bg-primary-dark transition"
          >
            {loading ? "Processing..." : `Pay Rs.${subtotal}`}
          </button>
        </form>
      </div>
      {/* Order Summary */}
      <div className="flex-1 max-w-lg mx-auto bg-white rounded shadow p-8 h-fit">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <ul className="divide-y">
          {products.map((item) => (
            <li key={item.id} className="py-3 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </div>
              </div>
              <div className="font-semibold">${item.price * item.quantity}</div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-6 font-bold text-lg border-t pt-4">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
