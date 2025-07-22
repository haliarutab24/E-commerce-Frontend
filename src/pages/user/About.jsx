// src/pages/user/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary mb-6">About ShopEase</h1>
      <p className="max-w-2xl text-lg text-gray-700 text-center mb-8">
        ShopEase is your one-stop destination for premium electronics, fashion, home essentials, and more. 
        We are committed to providing a seamless and enjoyable shopping experience, with a focus on quality, value, and customer satisfaction.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-3xl mb-2">🚚</span>
          <h2 className="text-xl font-semibold mb-2">Fast Shipping</h2>
          <p className="text-gray-600 text-center">Get your orders delivered quickly and reliably, wherever you are.</p>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-3xl mb-2">🔒</span>
          <h2 className="text-xl font-semibold mb-2">Secure Payments</h2>
          <p className="text-gray-600 text-center">Your transactions are protected with industry-leading security.</p>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-3xl mb-2">💬</span>
          <h2 className="text-xl font-semibold mb-2">24/7 Support</h2>
          <p className="text-gray-600 text-center">Our support team is always here to help you with any questions.</p>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </div>
  );
};

export default About;
