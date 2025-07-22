import React from "react";
import { FaAndroid, FaApple } from "react-icons/fa";

const apps = [
  {
    platform: "Android",
    icon: <FaAndroid className="text-green-600 w-10 h-10" />,
    version: "2.3.1",
    size: "28 MB",
    lastUpdate: "2024-05-01",
    downloads: "1,200,000+",
    link: "#", // Replace with actual Play Store link
    description:
      "ShopHub Android app offers a seamless shopping experience, push notifications, and secure payments. Download now and enjoy exclusive mobile deals!",
  },
  {
    platform: "iOS",
    icon: <FaApple className="text-gray-800 w-10 h-10" />,
    version: "2.3.1",
    size: "32 MB",
    lastUpdate: "2024-05-01",
    downloads: "900,000+",
    link: "#", // Replace with actual App Store link
    description:
      "ShopHub iOS app brings you the best of our store, with fast checkout, order tracking, and personalized recommendations. Get it on your iPhone or iPad today!",
  },
];

const MobileApps = () => (
  <div className="max-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
    <h1 className="text-3xl font-bold text-primary mb-8 text-center">ShopHub Mobile Apps</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      {apps.map((app, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100"
        >
          <div className="mb-4">{app.icon}</div>
          <h2 className="text-2xl font-semibold mb-2">{app.platform} App</h2>
          <p className="text-gray-600 mb-4 text-center">{app.description}</p>
          <ul className="text-sm text-gray-700 mb-6 w-full">
            <li>
              <span className="font-semibold">Version:</span> {app.version}
            </li>
            <li>
              <span className="font-semibold">App Size:</span> {app.size}
            </li>
            <li>
              <span className="font-semibold">Last Update:</span> {app.lastUpdate}
            </li>
            <li>
              <span className="font-semibold">Downloads:</span> {app.downloads}
            </li>
          </ul>
          <a
            href={app.link}
            className="bg-primary hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            {app.platform === "Android" ? "Get it on Google Play" : "Download on the App Store"}
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default MobileApps;
