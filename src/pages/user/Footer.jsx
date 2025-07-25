import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#000000] mt-20 border-t-2 border-[#89B9AD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Column - Full width on mobile, then normal */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 font-bold text-2xl sm:text-3xl text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300"
            >
              <Store className="w-8 h-8 sm:w-10 sm:h-10 text-[#89B9AD]" />
              <span>Wahid Foods SMC PVT.Ltd</span>
            </Link>
            <p className="text-[#89B9AD] text-sm sm:text-base leading-relaxed">
              Your premier destination for quality products and an exceptional shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-lg sm:text-xl text-[#89B9AD]">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: "/products", text: "All Products" },
                { to: "/about", text: "About Us" },
                { to: "/contact", text: "Contact" },
                { to: "/faq", text: "FAQ" }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300 text-sm sm:text-base"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-lg sm:text-xl text-[#89B9AD]">
              Customer Service
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: "/shipping", text: "Shipping Info" },
                { to: "/returns", text: "Returns" },
                { to: "/support", text: "Support" },
                { to: "/privacy", text: "Privacy Policy" }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#89B9AD] hover:text-[#FFFFFF] transition-colors duration-300 text-sm sm:text-base"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Full width on mobile, then normal */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-3 sm:mb-4 text-lg sm:text-xl text-[#89B9AD]">
              Stay Updated
            </h3>
            <p className="text-[#89B9AD] text-xs sm:text-sm mb-3 sm:mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border border-[#89B9AD]/50 bg-[#000000] text-[#89B9AD] px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#89B9AD] transition text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#89B9AD] to-[#89B9AD] hover:from-[#C7DCA7] hover:to-[#89B9AD] text-white font-medium sm:font-semibold rounded-md py-1.5 sm:py-2 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#89B9AD]/50 mt-8 sm:mt-12 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <p className="text-[#89B9AD] text-xs sm:text-sm text-center sm:text-left">
            © 2025 Wahid Foods SMC PVT.Ltd. All rights reserved.
          </p>
          <p className="text-[#89B9AD] text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
            Made with{' '}
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#89B9AD] animate-pulse" /> by Wahid Foods Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;