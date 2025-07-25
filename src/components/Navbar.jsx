import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaPlus } from "react-icons/fa";
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
        console.error('Error fetching cart count:', error);
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
    { path: "/products", text: "Products", icon: <FaPlus className="mr-2" /> },
    { path: "/return-policy", text: "Return Policy" },
    { path: "/disclaimer", text: "Disclaimer" },
    { path: "/apps", text: "Apps" },
    { path: "/about", text: "About" },
    { path: "/contact", text: "Contact" }
  ];

  return (
    <nav
      className="bg-[#000000] shadow-md shadow-[#f5f6fa]/30 sticky top-0 z-50"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-lg font-bold text-[#00897B] hover:text-[#f5f6fa] transition-colors duration-300"
          >
            Wahid Foods SMC
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[#00897B] hover:text-[#f5f6fa] font-medium transition-colors duration-300 flex items-center"
            >
              {link.path === "/products" && <FaPlus className="mr-1" />}
              {link.text}
            </Link>
          ))}

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative flex items-center">
              <FaShoppingCart className="text-xl text-[#00897B] hover:text-[#f5f6fa] transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#89B9AD] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {!userInfo ? (
              <Link
                to="/login"
                className="text-[#00897B] hover:text-[#f5f6fa] font-medium transition-colors duration-300 flex items-center"
              >
                <FaUserCircle className="mr-1" /> Sign In
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="focus:outline-none flex items-center space-x-2"
                >
                  <FaUserCircle className="text-xl text-[#00897B] hover:text-[#f5f6fa] transition-colors duration-300" />
                  <span className="text-[#00897B] font-medium hover:text-[#f5f6fa] transition-colors duration-300">
                    {userInfo.username || userInfo.name || userInfo.email}
                  </span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-[#00897B] hover:bg-[#f5f6fa]/20 hover:text-[#f5f6fa] transition-colors duration-300"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-[#00897B] hover:bg-[#00897B]/20 hover:text-[#f5f6fa] transition-colors duration-300"
                      onClick={() => setShowDropdown(false)}
                    >
                      Orders
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-[#00897B] hover:bg-[#00897B]/20 hover:text-[#f5f6fa] transition-colors duration-300"
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
        </div>

        {/* Mobile Header Icons */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-[#00897B] hover:text-[#f5f6fa] transition-colors duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#89B9AD] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {!userInfo && (
            <Link
              to="/login"
              className="text-[#00897B] hover:text-[#f5f6fa] transition-colors duration-300"
            >
              <FaUserCircle className="text-xl" />
            </Link>
          )}

          <button
            className="mobile-menu-button text-[#00897B] focus:outline-none"
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-[#000000] shadow-lg py-4 px-4 z-40"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[#00897B] hover:text-[#f5f6fa] font-medium transition-colors duration-300 py-2 px-2 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && React.cloneElement(link.icon, { className: "mr-2" })}
                  {link.text}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#00897B]/30">
                {userInfo ? (
                  <>
                    <Link
                      to="/profile"
                      className="block text-[#00897B] hover:text-[#f5f6fa] font-medium transition-colors duration-300 py-2 px-2 flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUserCircle className="mr-2" /> Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block text-[#00897B] hover:text-[#f5f6fa] font-medium transition-colors duration-300 py-2 px-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      className="block w-full text-left text-[#00897B] hover:text-[#f5f6fa] font-medium transition-colors duration-300 py-2 px-2"
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
                    className="block text-[#00897B] hover:text-[#f5f6fa] font-medium transition-colors duration-300 py-2 px-2 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserCircle className="mr-2" /> Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;