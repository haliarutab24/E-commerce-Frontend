import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const disclaimerPoints = [
  {
    title: "Accuracy of Information",
    text:
      "While we strive to provide accurate descriptions, images, and pricing for all products listed on ShopEase, we cannot guarantee that all information is always up-to-date or error-free. Product colors, packaging, and specifications may vary from those shown due to manufacturer updates or differences in display settings.",
  },
  {
    title: "Product Availability",
    text:
      "All products are subject to availability. We reserve the right to limit quantities or discontinue any product at any time without prior notice.",
  },
  {
    title: "Health & Safety",
    text:
      "Please read all product labels, warnings, and directions provided by the manufacturer before use. ShopEase is not responsible for any adverse effects or damages resulting from the use or misuse of any product purchased through our platform.",
  },
  {
    title: "External Links",
    text:
      "Our website may contain links to third-party sites for additional product information. We are not responsible for the content or accuracy of information on external sites.",
  },
  {
    title: "Legal Liability",
    text: (
      <>
        ShopEase is not liable for any direct, indirect, incidental, or consequential damages arising from the use of products purchased from our site. All purchases are subject to our{" "}
        <a href="/terms" className="text-blue-600 underline">Terms & Conditions</a> and{" "}
        <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
      </>
    ),
  }
];

const Disclaimer = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="max-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">Product Disclaimer</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {disclaimerPoints.map((point, idx) => (
          <div
            key={idx}
            ref={el => (cardsRef.current[idx] = el)}
            className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col h-full border border-blue-100"
          >
            {point.title && (
              <h2 className="text-xl font-semibold mb-2 text-primary">{point.title}</h2>
            )}
            <p className="text-gray-700">{point.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disclaimer;
