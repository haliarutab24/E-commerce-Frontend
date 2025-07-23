import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef();
  const textRef = useRef();

  // Image from public/images folder
  const images = [
    "/images/Hero.png", // Your image filename
  ];

  useEffect(() => {
    gsap.fromTo(
      slideRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full h-[500px] overflow-hidden relative">
      <div
        className="relative w-full h-full"
        ref={slideRef}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images[current]}) no-repeat center 30%/cover`,
          userSelect: "none",
          // Removed pointerEvents: "none" to allow interaction
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.8)",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
          <h1
            ref={textRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-center animate-pulse"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)" }}
          >
            Welcome to Wahid Foods SMC PVT.Ltd
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
            Discover the best products with unbeatable deals!
          </p>
          <Link to="/products">
            <button className="bg-[#89B9AD] hover:bg[#66D2CE] text-white font-semibold px-8 py-4 rounded-lg shadow-2xl transform hover:scale-110 transition-all duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carousel;