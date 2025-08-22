// src/pages/admin/UsersTable.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { PuffLoader } from "react-spinners"; 

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/users`,
          
        );
        setUsers(Array.isArray(data.data) ? data.data : []);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setUsers([]);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <PuffLoader color="#00c7fc" />
      </div>
    );
  }

  // Update user status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/users/${id}/status`,
        { status: newStatus }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: data.data.status } : user
        )
      );
      toast.success(`User status updated to ${newStatus}.`);
    } catch (error) {
      toast.error("Failed to update user status.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/users/${id}`,
        
      );
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.error("User deleted.");
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        All Users
      </h1>
      <div className="bg-white rounded shadow p-6 w-full mx-4 ">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Verified</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className={`border-b ${user.status === "suspend" ? "bg-red-50" : ""}`}
                >
                  <td className="py-2 px-4">{user.username || user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === 'admin' || user.isAdmin 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' || user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {user.isVerified ? (
                      <span className="text-green-600 text-lg">✅</span>
                    ) : (
                      <span className="text-red-500 text-lg">❌</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {user.status === "active" && <span className="text-green-600 font-semibold">Active</span>}
                    {user.status === "pending" && <span className="text-yellow-600 font-semibold">Pending</span>}
                    {user.status === "suspend" && <span className="text-red-500 font-semibold">Suspended</span>}
                  </td>
                  <td className="py-2 px-4 text-right">
                    {/* Flex container for responsive layout */}
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:justify-end">
                      {/* Status change buttons */}
                      {user.status !== "active" && (
                        <button
                          onClick={() => handleStatusChange(user._id, "active")}
                          className="w-20 px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-xs font-semibold text-center"
                        >
                          Activate
                        </button>
                      )}
                      {user.status !== "suspend" && (
                        <button
                          onClick={() => handleStatusChange(user._id, "suspend")}
                          className="w-20 px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold text-center"
                        >
                          Suspend
                        </button>
                      )}
                      {/* Only show delete button if user is NOT an admin */}
                      {!(user.role === 'admin' || user.isAdmin) && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="w-20 px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-semibold text-center"
                        >
                          Delete
                        </button>
                      )}
                    </div>
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

export default UsersTable;
