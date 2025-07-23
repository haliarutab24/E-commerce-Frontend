import React from "react";
import { FaAndroid, FaApple } from "react-icons/fa";
import { motion } from "framer-motion";

const apps = [
  {
    platform: "Android",
    icon: <FaAndroid className="text-green-600 w-10 h-10" />,
    version: "2.3.1",
    size: "28 MB",
    lastUpdate: "2024-05-01",
    downloads: "1,200,000+",
    link: "#", // Replace with actual Play Store link
    description:
      "ShopEase Android app offers a seamless shopping experience, push notifications, and secure payments. Download now and enjoy exclusive mobile deals!",
  },
  {
    platform: "iOS",
    icon: <FaApple className="text-gray-800 w-10 h-10" />,
    version: "2.3.1",
    size: "32 MB",
    lastUpdate: "2024-05-01",
    downloads: "900,000+",
    link: "#", // Replace with actual App Store link
    description:
      "ShopEase iOS app brings you the best of our store, with fast checkout, order tracking, and personalized recommendations. Get it on your iPhone or iPad today!",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(137, 185, 173, 0.4)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const MobileApps = () => (
  <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f9f7] to-[#e0f3ef]">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-[#89B9AD] mb-8 text-center">ShopEase Mobile Apps</h1>
    </motion.div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
    >
      {apps.map((app, idx) => (
        <motion.div
           key={idx}
  variants={{
    ...itemVariants,
    hover: cardHoverVariants.hover
  }}
          className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center transition-all duration-300 hover:border-[#89B9AD] hover:border-opacity-50 hover:border"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: idx === 0 ? [0, 5, -5, 0] : [0, -2, 2, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              repeatDelay: 2
            }}
            className="mb-4"
          >
            {app.icon}
          </motion.div>
          
          <h2 className="text-2xl font-semibold mb-2 text-[#555]">{app.platform} App</h2>
          <p className="text-gray-600 mb-4 text-center">{app.description}</p>
          
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-700 mb-6 w-full space-y-1"
          >
            <li>
              <span className="font-semibold">Version:</span> {app.version}
            </li>
            <li>
              <span className="font-semibold">App Size:</span> {app.size}
            </li>
            <li>
              <span className="font-semibold">Last Update:</span> {app.lastUpdate}
            </li>
            <li>
              <span className="font-semibold">Downloads:</span> {app.downloads}
            </li>
          </motion.ul>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={app.link}
            className="bg-[#89B9AD] hover:bg-[#6a9c8f] text-white font-semibold px-6 py-2 rounded transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            {app.platform === "Android" ? "Get it on Google Play" : "Download on the App Store"}
          </motion.a>
        </motion.div>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-12 text-center text-gray-500 text-sm"
    >
      &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
    </motion.div>
  </div>
);

export default MobileApps;