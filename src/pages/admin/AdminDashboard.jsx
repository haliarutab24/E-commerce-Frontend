// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Charts from '../../components/Dashboard/Charts';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/table';
import User from "../../components/Dashboard/User";

const AdminDashboard = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch all products, first 5 products, and all users in parallel
        const [allProductsRes, recentProductsRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/products?limit=5&sort=desc`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/users`),
        ]);
        setAllProducts(allProductsRes.data.data); // All products array
        setRecentProducts(recentProductsRes.data.data); // First 5 products array
        setUsers(usersRes.data.data); // All users array

        // Console log as requested
        console.log("First 5 products:", recentProductsRes.data.data);
        console.log("All products:", allProductsRes.data.data);
        console.log("All users:", usersRes.data.data);
      } catch (error) {
        // Optionally handle errora
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        Admin Dashboard
      </h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">
            {allProducts.length}
          </span>
          <span className="text-gray-600 mt-2">Total Products</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">
            {users.length}
          </span>
          <span className="text-gray-600 mt-2">Total Users</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">
            Rs.{5000}
          </span>
          <span className="text-gray-600 mt-2">Total Transactions</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">
            Rs.{1200}
          </span>
          <span className="text-gray-600 mt-2">Total Revenue</span>
        </div>
        {/* You can add revenue/orders here if you have those endpoints */}
      </div>

      {/* Dashboard View */}
      <Charts />

      {/* Recently Added Products */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        {/* Table Section */}
        <div className="bg-white rounded shadow p-6 flex-1 min-w-0">
          <h2 className="text-xl font-semibold mb-4">Recently Added Products</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : recentProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No products found.</TableCell>
                  </TableRow>
                ) : (
                  recentProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={product.images?.[0]?.url || "https://via.placeholder.com/64"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-primary font-bold">Rs.{product.price}</TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {product.category?.map(cat => cat.name).join(', ') || 'N/A'}
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">{product.stock}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* User (Auditors) Card */}
        <div className="w-full lg:w-[22rem] flex-shrink-0">
          <User users={users} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
