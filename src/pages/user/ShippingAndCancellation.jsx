import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ShippingAndCancellation = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll("h2, p, li"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-4xl my-10 mx-auto p-12 bg-white  rounded-2xl shadow-lg border border-newPrimary"
    >
      <h2 className="text-3xl font-bold text-newPrimary mb-4">
        📦 Shipping Policy
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>We offer <strong>fast and reliable</strong> shipping across Pakistan and selected international destinations.</li>
        <li><strong>Local Orders:</strong> Delivered within <strong>3–5 business days</strong> after order confirmation.</li>
        <li><strong>International Orders:</strong> Delivered within <strong>10–15 business days</strong>, subject to customs clearance.</li>
        <li>Customers receive a <strong>tracking link</strong> via email/SMS once dispatched.</li>
        <li>Shipping costs vary based on location and weight.</li>
      </ul>

      <h2 className="text-3xl font-bold text-newPrimary mt-8 mb-4">
        ❌ Cancellation Policy
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Orders can be <strong>cancelled within 24 hours</strong> if they have not been shipped.</li>
        <li>Contact <strong>Customer Support</strong> via email or phone to cancel.</li>
        <li>Once shipped, orders cannot be cancelled but may be eligible for return/exchange under our <strong>Return Policy</strong>.</li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        ⚠️ Delays may occur during peak seasons, public holidays, or due to unforeseen logistical issues.
      </p>
    </div>
  );
};

export default ShippingAndCancellation;
