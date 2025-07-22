// src/pages/user/Profile.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/transactions`,
          
        );
        // Filter transactions for the logged-in user
        const allTransactions = Array.isArray(data.data) ? data.data : [];
        console.log(allTransactions);
        
        const userTransactions = allTransactions.filter(
          txn => txn.userId === user?._id
        );
        setTransactions(userTransactions);
        console.log("Filtered transactions for user:", user?._id, userTransactions);
      } catch (error) {
        setTransactions([]);
        console.log("API error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTransactions();
  }, [user]);

  useEffect(() => {
    console.log("Transactions state:", transactions);
  }, [transactions]);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">Profile</h1>
      {/* User Details */}
      <div className="bg-white rounded shadow p-6 mb-10 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="mb-2">
          <span className="font-medium">Name:</span> {user?.name || user?.username}
        </div>
        <div className="mb-2">
          <span className="font-medium">Email:</span> {user?.email}
        </div>
        <div>
          <span className="font-medium">Joined:</span> {user?.createdAt?.slice(0, 10) || "Not Show"}
        </div>
      </div>
      {/* Transaction History */}
      <div className="bg-white rounded shadow p-6 mb-10 w-full max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {loading ? (
          <div>Loading...</div>
        ) : transactions.length === 0 ? (
          <div>No transactions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Txn ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Qty</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) =>
                  txn.products.map((prod, idx) => (
                    <tr key={txn._id + "-" + prod._id}>
                      <td className="py-2 px-4">{txn.transactionId}</td>
                      <td className="py-2 px-4">{new Date(txn.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{prod.productId.name}</td>
                      <td className="py-2 px-4">{prod.quantity}</td>
                      <td className="py-2 px-4">₹{prod.price}</td>
                      <td className="py-2 px-4">₹{(prod.price * prod.quantity).toFixed(2)}</td>
                      <td className="py-2 px-4">{txn.paymentStatus}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
