import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../context/authSlice"; // adjust path based on your structure


const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get user info from Redux
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Replace this with your cart state/count
  const cartCount = 2;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Wahid Foods SMC Pvt. Ltd
        </Link>
        <div className="space-x-6 flex items-center">
          <Link to="/products" className="text-gray-700 hover:text-primary">
            Products
          </Link>
          <Link to="/return-policy" className="text-gray-700 hover:text-primary">
            Return Policy
          </Link>
          <Link to="/disclaimer" className="text-gray-700 hover:text-primary">
            Disclaimer
          </Link>
          <Link to="/apps" className="text-gray-700 hover:text-primary">
            Apps
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary">
            Contact
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-gray-700 hover:text-primary" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
          {/* User Section */}
          {!userInfo ? (
            <Link
              to="/login"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="focus:outline-none flex items-center space-x-2"
              >
                <FaUserCircle className="text-xl text-gray-700 hover:text-primary" />
                <span className="text-gray-700 font-medium">
                  {userInfo.username || userInfo.name || userInfo.email}
                </span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Orders
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setShowDropdown(false);
                      dispatch(logout());
                      navigate("/login"); // or navigate("/") if you want to go to home
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;