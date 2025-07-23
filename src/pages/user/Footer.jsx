import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#000000] mt-20 border-t-2 border-[#89B9AD]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link
              to="/"
              className="flex items-center gap-3 font-bold text-3xl text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
            >
              <Store className="w-10 h-10 text-[#89B9AD]" />
              <span>Wahid Foods SMC PVT.Ltd</span>
            </Link>
            <p className="text-[#89B9AD] text-base leading-relaxed">
              Your premier destination for quality products and an exceptional shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-xl text-[#89B9AD]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4 text-xl text-[#89B9AD]">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shipping"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-xl text-[#89B9AD]">Stay Updated</h3>
            <p className="text-[#89B9AD] text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border border-[#89B9AD]/50 bg-[#000000] text-[#89B9AD] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#89B9AD] transition"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#89B9AD] to-[#89B9AD] hover:from-[#C7DCA7] hover:to-[#89B9AD] text-[] hover:text-[#FFFFFF] font-semibold rounded-md py-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#89B9AD]/50 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#89B9AD] text-sm">
            © 2025 Wahid Foods SMC PVT.Ltd. All rights reserved.
          </p>
          <p className="text-[#89B9AD] text-sm flex items-center gap-2">
            Made with{' '}
            <Heart className="w-5 h-5 text-[#89B9AD] animate-pulse" /> by Wahid Foods Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;