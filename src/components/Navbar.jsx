import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../context/authSlice"; // adjust path based on your structure
import axios from 'axios';

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
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const userId = user?.id;
      if (!userId) return;

      try {
        const response = await axios.get(`${API_URL}/cart/${userId}`);
        const cart = response.data;
        const count = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      } catch (error) {
        setCartCount(0);
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCart(); // Initial fetch

    // Listen for cart updates
    const handleCartUpdate = () => fetchCart();
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Optionally, keep your interval for background sync
    const interval = setInterval(fetchCart, 20000);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav
      className="bg-white shadow-md shadow-[#f5f6fa]/30 sticky top-0 z-50"
      style={{ fontFamily: "'Poppins', sans-serif" }} // Custom font (add via Google Fonts)
    >
      <div className="mx-20 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src="/images/logo2.jpg"
              alt="Wahid Foods SMC Logo"
              className="h-16 w-40 mr-2"  // Increased width from w-24 to w-40
              style={{ objectFit: "contain" }}
            />
            {/* Optionally, keep the text for accessibility or branding */}
            {/* <span className="sr-only">Wahid Foods SMC</span> */}
          </Link>
        </div>
        <div className="space-x-8 flex items-center">
          <Link
            to="/products"
            className="text-black hover:text-newPrimary font-medium transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            to="/return-policy"
            className="text-black hover:text-newPrimary font-medium transition-colors duration-300"
          >
            Return Policy
          </Link>
          <Link
            to="/disclaimer"
            className="text-black hover:text-newPrimary font-medium transition-colors duration-300"
          >
            Disclaimer
          </Link>
          <Link
            to="/apps"
            className="text-black hover:text-newPrimary font-medium transition-colors duration-300"
          >
            Apps
          </Link>
          <Link
            to="/about"
            className="text-black hover:text-newPrimary font-medium transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-black hover:text-newPrimary font-medium transition-colors duration-300"
          >
            Contact
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-newPrimary hover:text-newPrimaryFooter transition-colors duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-newPrimary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {/* User Section */}
          {!userInfo ? (
            <Link
              to="/login"
              className="text-newPrimary hover:text-newPrimaryFooter font-medium transition-colors duration-300"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="focus:outline-none flex items-center space-x-2"
              >
                <FaUserCircle className="text-xl text-newPrimary hover:text-newPrimaryFooter transition-colors duration-300" />
                <span className="text-newPrimary font-medium hover:text-newPrimaryFooter transition-colors duration-300">
                  {userInfo.username || userInfo.name || userInfo.email}
                </span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-newPrimary hover:bg-newPrimary hover:text-white transition-colors duration-300"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-newPrimary hover:bg-newPrimary hover:text-white transition-colors duration-300"
                    onClick={() => setShowDropdown(false)}
                  >
                    Orders
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-newPrimary hover:bg-newPrimary hover:text-white transition-colors duration-300"
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