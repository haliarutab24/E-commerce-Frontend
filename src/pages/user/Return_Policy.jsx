import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaUndoAlt, FaClock, FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";

const policyPoints = [
  {
    icon: <FaUndoAlt className="w-6 h-6" />,
    title: "Easy Returns",
    text: "If you are not completely satisfied with your purchase, you can return most products within 14 days of delivery for a full refund or exchange.",
  },
  {
    icon: <FaClock className="w-6 h-6" />,
    title: "Return Window",
    text: "Returns must be initiated within 14 days of receiving your order. Items must be unused, in their original packaging, and in resalable condition.",
  },
  {
    icon: <FaBoxOpen className="w-6 h-6" />,
    title: "Non-Returnable Items",
    text: "Certain items such as perishable goods, personal care products, and customized items are not eligible for return. Please check the product page for specific return eligibility.",
  },
  {
    icon: <FaMoneyBillWave className="w-6 h-6" />,
    title: "Refunds",
    text: "Once your return is received and inspected, your refund will be processed to your original payment method within 5-7 business days.",
  },
];

const ReturnPolicy = () => {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const descRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Ensure elements are visible before animation starts
    gsap.set([titleRef.current, underlineRef.current, descRef.current, ...cardsRef.current, footerRef.current], {
      visibility: "visible"
    });

    // Title animation sequence
    gsap.timeline()
      .from(titleRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(underlineRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: "expo.out",
        delay: -0.4
      })
      .from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out"
      });

    // Cards animation with responsive delay
    const staggerDelay = window.innerWidth < 768 ? 0.2 : 0.15;
    
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: staggerDelay,
        ease: "back.out(1.2)",
        delay: 0.3
      }
    );

    // Footer animation
    gsap.from(footerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 1,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9f7] to-[#e0f3ef] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-4xl font-bold text-[#2a6b5e] mb-4 md:mb-6 leading-tight
                      drop-shadow-[0_2px_2px_rgba(137,185,173,0.4)]"
            style={{ visibility: "hidden" }}
          >
            Return Policy
          </h1>
          <div 
            ref={underlineRef}
            className="w-32 h-2 bg-gradient-to-r from-[#89B9AD] to-[#2a6b5e] mx-auto rounded-full 
                      origin-left transform scale-x-0"
            style={{ visibility: "hidden" }}
          ></div>
          <p 
            ref={descRef}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-6"
            style={{ visibility: "hidden" }}
          >
            We want you to love your purchase! If you're not satisfied, our return process is simple and transparent.
          </p>
        </div>

        {/* Policy Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
          {policyPoints.map((point, idx) => (
            <div
              key={idx}
              ref={el => (cardsRef.current[idx] = el)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 md:p-8 flex flex-col h-full border border-[#e0f3ef] hover:border-[#89B9AD] transition-all duration-300 transform hover:-translate-y-1"
              style={{ visibility: "hidden" }}
            >
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-lg bg-[#f0f9f7] text-[#2a6b5e] mr-4 flex-shrink-0">
                  {point.icon}
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{point.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{point.text}</p>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div 
          ref={footerRef}
          className="bg-[#f0f9f7] rounded-xl p-6 text-center max-w-4xl mx-auto border border-[#e0f3ef] shadow-sm"
          style={{ visibility: "hidden" }}
        >
          <p className="text-gray-700 text-sm md:text-base">
            <strong>To start a return:</strong> Please contact our customer support at{" "}
            <a href="mailto:support@shopease.com" className="text-[#2a6b5e] font-medium hover:underline">support@shopease.com</a> or visit your{" "}
            <a href="/profile" className="text-[#2a6b5e] font-medium hover:underline">account page</a>.
          </p>
        </div>

        {/* Copyright Footer */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;