// src/pages/admin/TransactionsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/transactions`,
        );
        console.log("Fetched transactions:", data)
        
        // data.data is the array of transactions
        setTransactions(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        Transactions
      </h1>
      <div className="bg-white rounded shadow p-6 max-w-6xl mx-auto overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Txn ID</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Qty</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((txn) =>
                txn.products.map((prod, idx) => (
                  <tr key={txn._id + "-" + prod._id} className="border-b">
                    <td className="py-2 px-4">{txn.transactionId}</td>
                    <td className="py-2 px-4">
                      {/* Display the email if it exists, otherwise show a fallback */}
                      {txn.userId?._id || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {prod.productId?.name || "Product Deleted"}
                    </td>
                    <td className="py-2 px-4">{prod.quantity}</td>
                    <td className="py-2 px-4">Rs.{prod.price}</td>
                    <td className="py-2 px-4">Rs.{(prod.price * prod.quantity).toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${txn.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : ''}
                          ${txn.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${txn.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' : ''}
                        `}
                      >
                        {/* Capitalize the first letter */}
                        {txn.paymentStatus.charAt(0).toUpperCase() + txn.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
