import React from "react";
import { FaUndoAlt, FaClock, FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";

const policyPoints = [
  {
    icon: <FaUndoAlt className="text-blue-600 w-7 h-7" />,
    title: "Easy Returns",
    text: "If you are not completely satisfied with your purchase, you can return most products within 14 days of delivery for a full refund or exchange.",
  },
  {
    icon: <FaClock className="text-green-600 w-7 h-7" />,
    title: "Return Window",
    text: "Returns must be initiated within 14 days of receiving your order. Items must be unused, in their original packaging, and in resalable condition.",
  },
  {
    icon: <FaBoxOpen className="text-yellow-600 w-7 h-7" />,
    title: "Non-Returnable Items",
    text: "Certain items such as perishable goods, personal care products, and customized items are not eligible for return. Please check the product page for specific return eligibility.",
  },
  {
    icon: <FaMoneyBillWave className="text-purple-600 w-7 h-7" />,
    title: "Refunds",
    text: "Once your return is received and inspected, your refund will be processed to your original payment method within 5-7 business days.",
  },
];

const ReturnPolicy = () => (
  <div className="max-h-screen flex flex-col items-center  bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
    <div className="max-w-3xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 border-2 border-blue-200">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">Return Policy</h1>
      <p className="text-gray-700 text-lg mb-8 text-center">
        We want you to love your purchase! If you’re not satisfied, our return process is simple and transparent.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {policyPoints.map((point, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-blue-50 rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <div>{point.icon}</div>
            <div>
              <h2 className="font-bold text-lg text-blue-800 mb-1">{point.title}</h2>
              <p className="text-gray-700 text-sm">{point.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-100 rounded-xl p-4 text-blue-900 text-center text-sm font-medium shadow-inner">
        <span>
          <strong>To start a return:</strong> Please contact our customer support at{" "}
          <a href="mailto:support@shophub.com" className="underline text-blue-700">support@shophub.com</a> or visit your <a href="/profile" className="underline text-blue-700">account page</a>.
        </span>
      </div>
    </div>
  </div>
);

export default ReturnPolicy;
