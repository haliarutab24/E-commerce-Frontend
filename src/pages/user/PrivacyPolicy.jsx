import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-gray-800 mb-4 leading-relaxed">
            At <span className="font-semibold text-newPrimary">Wahid Foods SMC</span>,
            your privacy is important to us. This policy explains how we collect,
            use, and protect your personal data when you visit our website or
            purchase from us.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">Data We Collect</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Contact info: name, email, phone, addresses.</li>
            <li>Account data: username, password.</li>
            <li>Order details & transaction history.</li>
            <li>Messages via email, chat, or social media.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">How We Use It</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Deliver products & services.</li>
            <li>Respond to queries & feedback.</li>
            <li>Improve website & customer experience.</li>
            <li>Prevent fraud & meet legal obligations.</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="min-h-[200px]">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sharing Your Data</h2>
          <p className="text-gray-800 mb-4 leading-relaxed">
            We only share data with trusted partners like payment processors,
            banks, and courier services to complete your orders. We never sell
            your information.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Measures</h2>
          <p className="text-gray-800 mb-4 leading-relaxed">
            We use secure servers, encryption, and strict access controls to
            protect your personal data. In case of a breach, we will notify you
            promptly as required by law.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">Retention Period</h2>
          <p className="text-gray-800 mb-4 leading-relaxed">
            We keep your data only as long as necessary to fulfill our services
            and legal obligations. You can request deletion at any time.
          </p>

          <p className="text-sm italic text-gray-600">
            By using our site, you agree to this policy. For questions, contact
            us at{" "}
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

export default PrivacyPolicy;
