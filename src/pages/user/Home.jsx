// src/pages/Home.jsx
import React from "react";
import Carousel from "../../components/Carousel";
import Features  from "../../components/Features";

const images = [
  "https://plus.unsplash.com/premium_photo-1683140435505-afb6f1738d11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpcnR8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnQlMjB3ZWFyfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1687294575545-44fcc8761b6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVudHMlMjB3ZWFyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1579362094446-3db5b312f2ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN3ZWFyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1596423215455-7f91e01daacc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
  "https://plus.unsplash.com/premium_photo-1728664899764-4131241aa49d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1673977133185-a460c4744cec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjB3b21lbiUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1553545985-1e0d8781d5db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
  "https://plus.unsplash.com/premium_photo-1726880596967-9b678d7f31d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI0fHx8ZW58MHx8fHx8",
  
];

const Home = () => {
  return (
     <div className="pt-2 w-full min-h-screen bg-[#ffffff] flex flex-col">
      <div className="w-full h-[35rem]">
        <Carousel images={images} />
      </div>

      <div className="my-6 px-10">
        <Features />
      </div>
    </div>
  );
};

export default Home;
