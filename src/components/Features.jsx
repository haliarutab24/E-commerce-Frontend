import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import axios from "axios";
import { PuffLoader } from "react-spinners"; // ✅ Import the loader

const Features = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [featuresRes, discountsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/features`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/discounts`),
        ]);

        const featuresData = featuresRes.data.data || [];
        const discountsData = discountsRes.data.data || [];

        setFeaturedProducts(featuresData);
        setDiscountProducts(discountsData);

        console.log("Fetched Featured Products:", featuresData);
        console.log("Fetched Discount Products:", discountsData);

        // ✅ Add a fixed 2-second delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false); // Ensure it hides loader even on error
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Featured Products Section */}
      <section className="pt-10 pb-6 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#89B9AD] mb-4">Featured Products</h2>
            <p className="text-[#89B9AD] text-lg">
              Discover our handpicked selection of premium products
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <PuffLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Discount Products Section */}
      <section className="py-10 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">Discount Products</h2>
            <p className="text-[#000000] text-lg">
              Great deals on your favorite items
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <PuffLoader color="#f2f4f5ff" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {discountProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;