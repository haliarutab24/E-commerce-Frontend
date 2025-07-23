import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiAlertTriangle, FiPackage, FiShield, FiLink, FiFileText } from "react-icons/fi";

const disclaimerPoints = [
  {
    title: "Accuracy of Information",
    icon: <FiAlertTriangle className="w-6 h-6" />,
    text: "While we strive to provide accurate descriptions, images, and pricing for all products listed on ShopEase, we cannot guarantee that all information is always up-to-date or error-free. Product colors, packaging, and specifications may vary from those shown due to manufacturer updates or differences in display settings.",
  },
  {
    title: "Product Availability",
    icon: <FiPackage className="w-6 h-6" />,
    text: "All products are subject to availability. We reserve the right to limit quantities or discontinue any product at any time without prior notice.",
  },
  {
    title: "Health & Safety",
    icon: <FiShield className="w-6 h-6" />,
    text: "Please read all product labels, warnings, and directions provided by the manufacturer before use. ShopEase is not responsible for any adverse effects or damages resulting from the use or misuse of any product purchased through our platform.",
  },
  {
    title: "External Links",
    icon: <FiLink className="w-6 h-6" />,
    text: "Our website may contain links to third-party sites for additional product information. We are not responsible for the content or accuracy of information on external sites.",
  },
  {
    title: "Legal Liability",
    icon: <FiFileText className="w-6 h-6" />,
    text: (
      <>
        ShopEase is not liable for any direct, indirect, incidental, or consequential damages arising from the use of products purchased from our site. All purchases are subject to our{" "}
        <a href="/terms" className="text-[#2a6b5e] font-medium hover:underline">Terms & Conditions</a> and{" "}
        <a href="/privacy" className="text-[#2a6b5e] font-medium hover:underline">Privacy Policy</a>.
      </>
    ),
  }
];

const Disclaimer = () => {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    // Ensure elements are visible before animation starts
    gsap.set([titleRef.current, underlineRef.current, ...cardsRef.current], {
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9f7] to-[#e0f3ef] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Premium Title Section */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-5xl font-bold text-[#2a6b5e] mb-4 md:mb-6 leading-tight
                      drop-shadow-[0_2px_2px_rgba(137,185,173,0.4)]"
            style={{ visibility: "hidden" }}
          >
            Product Disclaimer
          </h1>
          <div 
            ref={underlineRef}
            className="w-32 h-2 bg-gradient-to-r from-[#89B9AD] to-[#2a6b5e] mx-auto rounded-full 
                      origin-left transform scale-x-0"
            style={{ visibility: "hidden" }}
          ></div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {disclaimerPoints.map((point, idx) => (
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

        {/* Footer */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;