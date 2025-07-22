// src/pages/user/Orders.jsx
import React from "react";

// Static orders data
const orders = [
  {
    id: 1,
    product: "Premium Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=120&fit=crop",
    quantity: 1,
    price: 299.99,
    date: "2024-06-01",
    status: "Shipping",
  },
  {
    id: 2,
    product: "Smart Fitness Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=120&fit=crop",
    quantity: 2,
    price: 399.98,
    date: "2024-05-28",
    status: "In Progress",
  },
  {
    id: 3,
    product: "Minimalist Desk Lamp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop",
    quantity: 1,
    price: 89.99,
    date: "2024-05-20",
    status: "Delivered",
  },
];

const statusColor = (status) => {
  switch (status) {
    case "Shipping":
      return "text-blue-600";
    case "In Progress":
      return "text-yellow-600";
    case "Delivered":
      return "text-green-600";
    case "Cancelled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const Orders = () => {
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        My Orders
      </h1>
      <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2 px-4 flex items-center gap-2">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{order.product}</span>
                </td>
                <td className="py-2 px-4">{order.quantity}</td>
                <td className="py-2 px-4">₹{order.price.toFixed(2)}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td className={`py-2 px-4 font-semibold ${statusColor(order.status)}`}>
                  {order.status}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
