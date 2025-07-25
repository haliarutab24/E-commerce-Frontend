import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../context/authSlice";
import axios from 'axios';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      }
    };

    fetchCart();
    const handleCartUpdate = () => fetchCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    const interval = setInterval(fetchCart, 20000);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { path: "/products", text: "Products" },
    { path: "/return-policy", text: "Return Policy" },
    { path: "/disclaimer", text: "Disclaimer" },
    { path: "/apps", text: "Apps" },
    { path: "/about", text: "About" },
    { path: "/contact", text: "Contact" }
  ];

  return (
    <nav
      className="bg-white shadow-md shadow-[#f5f6fa]/30 sticky top-0 z-50"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex items-center justify-between px-5 md:px-20 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/images/logo2.jpg"
            alt="Wahid Foods SMC Logo"
            className="h-14 w-auto"
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden 900:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-black hover:text-newPrimary font-medium transition-colors duration-300"
            >
              {link.text}
            </Link>
          ))}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-newPrimary hover:text-newPrimaryFooter transition-colors duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-newPrimary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {!userInfo ? (
            <Link
              to="/login"
              className="text-newPrimary hover:text-newPrimaryFooter font-medium transition-colors duration-300 flex items-center gap-1"
            >
              <FaSignInAlt className="text-xl" />
              <span>Sign In</span>
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
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Icons (Cart, User, Hamburger) */}
        <div className="900:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-newPrimary hover:text-newPrimaryFooter transition-colors duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-newPrimary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {!userInfo ? (
            <Link
              to="/login"
              className="text-newPrimary hover:text-newPrimaryFooter transition-colors duration-300"
            >
              <FaSignInAlt className="text-xl" />
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="focus:outline-none"
              >
                <FaUserCircle className="text-xl text-newPrimary hover:text-newPrimaryFooter transition-colors duration-300" />
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
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-button text-newPrimary focus:outline-none absolute top-6 right-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="900:hidden bg-white shadow-lg py-4 px-5 z-40"
        >
          <div className="flex flex-col space-y-4 justify-center items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-newPrimary w-40 justify-center  hover:bg-newPrimary hover:text-white font-medium transition-colors duration-300 py-2 px-2 flex items-center rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            <div className=" pt-4 border-t border-newPrimary/30 w-40 items-center text-center">
              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="block text-newPrimary hover:bg-newPrimary hover:text-white font-medium transition-colors duration-300 py-2 px-2 items-center rounded flex flex-col justify-center items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserCircle className="mb-1 text-2xl" />
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block text-newPrimary hover:bg-newPrimary hover:text-white font-medium transition-colors duration-300 py-2 px-2 rounded flex flex-col justify-center items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    className="block w-full text-newPrimary hover:bg-newPrimary hover:text-white font-medium transition-colors duration-300 py-2 px-2 rounded flex flex-col justify-center items-center"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      dispatch(logout());
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block text-newPrimary hover:bg-newPrimary hover:text-white font-medium transition-colors duration-300 py-2 px-2 items-center rounded flex flex-col justify-center items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaSignInAlt className="mb-1 text-2xl" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;