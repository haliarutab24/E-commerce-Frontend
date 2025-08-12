import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Complaints = () => {
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
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6 border-b-4 border-newPrimary pb-2">
          Complaints Handling Mechanism
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          At <span className="font-semibold text-newPrimary">Wahid Foods SMC</span>,
          we value our customers and strive to ensure complete satisfaction with
          every order. In the rare event that you encounter any issue, we have a
          transparent and responsive complaints-handling process in place to
          address your concerns quickly and professionally.
        </p>

        <div className="bg-white border-l-4 border-newPrimary p-6 rounded-lg shadow-inner">
          <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Contact Channels:</strong> Customers can reach out to us
              via email at{" "}
              <a
                href="mailto:support@wahidfoodssmc.com"
                className="text-newPrimary font-medium underline"
              >
              support@wahidfoodssmc.com
              </a>{" "}
              or call our dedicated helpline at{" "}
              <span className="font-bold text-newPrimary">+92 3106828888</span>.
            </li>
            <li>
              <strong>Response Time:</strong> We acknowledge all complaints
              within <span className="font-semibold">24 hours</span> and aim to
              provide a resolution within{" "}
              <span className="font-semibold">3–5 working days</span>,
              depending on the complexity of the matter.
            </li>
            <li>
              <strong>Tracking Your Complaint:</strong> Upon submission, you
              will receive a unique complaint reference number to track the
              progress of your case.
            </li>
            <li>
              <strong>Dispute Resolution:</strong> Our customer care team works
              diligently to resolve disputes amicably and ensure you are kept
              informed throughout the process.
            </li>
            <li>
              <strong>Escalation:</strong> If you are not satisfied with the
              resolution, you may request escalation to our senior management
              team for further review.
            </li>
          </ul>
        </div>

        <p className="mt-6 text-gray-600 italic text-sm">
          Note: We encourage all customers to provide detailed information about
          their concern to help us resolve it faster and more efficiently.
        </p>
      </div>
    </div>
  );
};

export default Complaints;
