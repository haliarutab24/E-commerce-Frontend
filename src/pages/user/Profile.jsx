// src/pages/user/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  // console.log("user" ,user);
 
 
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/transactions`
        );
  
        const allTransactions = Array.isArray(data.data) ? data.data : [];
  
        const userTransactions = allTransactions
          .filter(txn => txn.userId === user.id)
          .map(txn => ({
            ...txn,
            formattedDate: new Date(txn.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          }));
  
        setTransactions(userTransactions);
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
    // console.log("Transactions state:", transactions);
  }, [transactions]);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-newPrimary text-center">Profile</h1>
      {/* User Details */}
      <div className="bg-white rounded shadow p-6 mb-10 w-full max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="mb-2">
          <span className="font-medium">Name:</span> {user?.name || user?.username}
        </div>
        <div className="mb-2">
          <span className="font-medium">Email:</span> {user?.email}
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
                  <th className="py-2 px-4 text-left">Total Amount</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(txn => (
                  txn.products.map(prod => (
                    <tr key={txn._id + "-" + prod._id}>
                      <td className="py-2 px-4">{txn.transactionId.slice(0, 15)}</td>
                      <td className="py-2 px-4">{txn.formattedDate}</td>
                      <td className="py-2 px-4">{prod.name}</td>
                      <td className="py-2 px-4">${(txn.totalAmount).toFixed(2)}</td>
                      <td className="py-2 px-4">
                        <span className="inline-block px-4 py-[6px] rounded-full bg-newPrimary text-white text-xs font-semibold">
                          {txn.paymentStatus.charAt(0).toUpperCase() + txn.paymentStatus.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
