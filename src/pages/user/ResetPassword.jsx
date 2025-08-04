import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Forget = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    gsap.from(".forget-box", { opacity: 0, y: 50, duration: 1 });
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
        { 
          token: token,
          newPassword: password 
        }
      );

      toast.success(data.message || "Password reset successfully!");
      navigate("/login");
      
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-newPrimary mb-6">Reset Password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>
        
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-newPrimary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
              minLength={6}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-newPrimary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-newPrimary text-white py-2 rounded-md hover:bg-newPrimary/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-center text-gray-600">
            <Link to="/login" className="text-newPrimary hover:text-newPrimaryDark">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Forget;
