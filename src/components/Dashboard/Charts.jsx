import React, { useEffect, useState } from "react";
import DynamicBarChart from "./DynamicBarChart";
import { FaArrowUp } from "react-icons/fa6";
import axios from "axios";
import User from "../Dashboard/User";

function Charts() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [transactionsRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/users`),
        ]);

        setTransactions(transactionsRes.data.data || []);

        // Sort users by newest and take the 5 most recent
        const sortedUsers = (usersRes.data.data || [])
          .sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
          .slice(0, 5);

        setUsers(sortedUsers);
        console.log("Dashboard data fetched successfully", users)
        

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Sales Graph Section */}
      <div className="w-full md:w-1/2 bg-white p-4 text-black shadow-xl rounded-md">
        <span className="font-semibold text-lg">Sales</span>
        <div className="pt-2 text-xs flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-bold text-xl">{transactions.length}</span>
            <span>Sales over Time</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <FaArrowUp size={15} /> 33.1%
            </span>
            <span>Sales this month</span>
          </div>
        </div>
        <div className="h-48 flex items-center justify-center">
          <DynamicBarChart />
        </div>
      </div>

      {/* User Table Section */}
      <div className="w-full md:w-1/2 bg-white p-4 shadow-xl rounded-md overflow-auto">
        <User users={users} />
      </div>
    </div>
  );
}

export default Charts;
