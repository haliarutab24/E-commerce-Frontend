
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RefundReturn = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        scale: 0.8, // Start slightly smaller for the "pop" effect
        y: 40, // Slide up from below
      },
      {
        opacity: 1,
        scale: 1, // Scale to normal size
        y: 0,
        duration: 0.8, // Shorter duration for a snappy effect
        ease: "triad", // Smooth and bouncy easing
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex items-center justify-center min-h-screen bg-gray-100 py-12 relative z-5"
    >
      <div
        className="max-w-5xl w-full bg-white text-gray-900 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 p-8 gap-8 border border-gray-300 overflow-visible"
      >
        {/* Column 1 */}
        <div className="min-h-[200px]">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 border-b-4 border-newPrimary pb-2">
            Refund, Return & Exchange Policy
          </h1>
          <p className="text-gray-800 mb-4 leading-relaxed">
            At <span className="font-semibold text-newPrimary">Wahid Foods SMC</span>, we strive to ensure your satisfaction. This policy outlines the conditions under which refunds, returns, or exchanges may be processed for products purchased through our website.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">Eligibility for Returns</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Returns, exchanges, or refunds are permitted only if the delivered goods are incorrect, defective, or damaged.</li>
            <li>All returns must be shipped via courier to <span className="font-semibold">Room no.1120, Goldcrest Mall, Phase 4,DHA,Lahore.</span></li>
            <li>Returns are accepted within <span className="font-semibold">10</span> days from the date of your order placement.</li>
            <li>Returned goods must be in their original, saleable condition, unused, and with all packaging intact.</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="min-h-[200px]">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Refund & Exchange Process</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Refunds for eligible, saleable goods will be credited within <span className="font-semibold">10</span> days of our receipt of the items.</li>
            <li>In lieu of a refund, we may offer store credit of equivalent value, allowing you to exchange for other products on our website.</li>
            <li>Customers are responsible for covering shipping costs associated with returning goods.</li>
          </ul>

          <p className="text-sm italic text-gray-600 mt-4">
            For further assistance or inquiries regarding our refund, return, or exchange policy, please contact us at{" "}
            <a
              href="mailto:support@wahidfoodssmc.com"
              className="text-newPrimary underline"
            >
             support@wahidfoodssmc.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundReturn;
