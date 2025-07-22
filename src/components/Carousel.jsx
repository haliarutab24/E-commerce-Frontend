// src/components/Carousel.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 }
    );
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="relative w-full h-full" ref={slideRef}>
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="w-full h-full object-cover"
        />

        <Link to="/products">

          <div className="absolute inset-0 flex items-end mb-5 justify-center pointer-events-none">
            <button className="bg-primary hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded pointer-events-auto">
              Shop Now
            </button>
          </div>
        </Link>
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Carousel;
