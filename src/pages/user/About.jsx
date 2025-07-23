import React from "react";
import { motion } from "framer-motion";

const About = () => {
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
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(137, 185, 173, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    }
  };

  const features = [
    {
      id: 1,
      icon: "🚚",
      title: "Fast Shipping",
      description: "Get your orders delivered quickly and reliably, wherever you are.",
      iconAnimation: {
        animate: { y: [0, -5, 0] },
        transition: { repeat: Infinity, duration: 2 }
      }
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Payments",
      description: "Your transactions are protected with industry-leading security.",
      iconAnimation: {
        animate: { rotate: [0, 10, -10, 0] },
        transition: { repeat: Infinity, duration: 3 }
      }
    },
    {
      id: 3,
      icon: "💬",
      title: "24/7 Support",
      description: "Our support team is always here to help you with any questions.",
      iconAnimation: {
        animate: { scale: [1, 1.1, 1] },
        transition: { repeat: Infinity, duration: 2 }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9f7] to-[#e0f3ef]">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-[#89B9AD] mb-8">About ShopEase</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-2xl text-lg text-gray-700 text-center mb-8"
        >
          ShopEase is your one-stop destination for premium electronics, fashion, home essentials, and more.
          We are committed to providing a seamless and enjoyable shopping experience, with a focus on quality, value, and customer satisfaction.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-all duration-300 hover:border-[#89B9AD] hover:border-opacity-50 hover:border"
            >
              <motion.span
                {...feature.iconAnimation}
                className="text-3xl mb-2"
              >
                {feature.icon}
              </motion.span>
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-600 text-center">{feature.description}</p>
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
    </div>
  );
};

export default About;