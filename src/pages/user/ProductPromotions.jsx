import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import ProductCard from "../../components/ProductCard";
import { PuffLoader } from "react-spinners";

const ProductCategories = () => {
  const { promotionName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        // Fetch products for this promotion
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/promotions/${promotionName.toLowerCase()}`
        );
        const data = await res.json();
        setProducts(data.data?.products || []);
        console.log("products" ,products);
        setTimeout(() => setLoading(false), 500); // for loader effect
      } catch (error) {
        setProducts([]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [promotionName]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [loading, products]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center capitalize">
        {promotionName.replace("-", " ")} Products
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <PuffLoader />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No products found for this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div
              key={product._id}
              ref={el => (cardsRef.current[idx] = el)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategories;