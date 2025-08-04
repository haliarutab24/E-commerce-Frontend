// src/pages/user/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const statusColor = (status) => {
  switch (status) {
    case "Shipping":
      return "text-blue-600";
    case "In Progress":
      return "text-yellow-600";
    case "Delivered":
    case "completed":
      return "text-green-600";
    case "Cancelled":
    case "failed":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user info from localStorage (adjust key as needed)
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const userId = user?.id || user?._id;
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`${API_URL}/orders?userId=${userId}`);
        const data = res.data.data || res.data;
  
        // Add formatted date field
        const userOrders = (Array.isArray(data) ? data : []).map(order => ({
          ...order,
          formattedDate: new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        }));
  
        setOrders(userOrders);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [userId]);
  

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-newPrimary text-center">
        My Orders
      </h1>
      <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Product(s)</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">
                    <ul>
                      {order.products.map((prod, idx) => (
                        <li key={idx}>
                          {prod.name} {prod.quantity ? `x${prod.quantity}` : ""}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    {order.products.reduce((sum, prod) => sum + (prod.quantity || 1), 0)}
                  </td>
                  <td className="py-2 px-4">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-2 px-4">{order.formattedDate}</td>
                  <td className={`py-2 px-4 font-semibold ${statusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
