// src/pages/user/Products.jsx
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products and enabled categories from backend
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/enabled`);
        const { products, categories } = res.data.data;
        setProductList(products);
        setCategories(categories);
        console.log(categories);
      } catch (error) {
        console.error("Failed to fetch products or categories", error);
      }
    };
    fetchData();
  }, []);

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All"
    ? productList
    : productList.filter((p) =>
      Array.isArray(p.category)
        ? p.category.some(c => c.name === selectedCategory)
        : p.category?.name === selectedCategory
    );

  useEffect(() => {
    // Only animate non-null elements
    const elements = cardsRef.current.filter(Boolean);
    if (elements.length === 0) return;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, [filteredProducts, selectedCategory]);

  useEffect(() => {
    cardsRef.current = [];
  }, [filteredProducts]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
  };

  const handleAddToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo')); // adjust key if needed
      const userId = user?.id; // adjust property if needed
      console.log("userId",userId);

      if (!userId) {
        toast.error('User not logged in');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/cart/add`,
        {
          userId, // pass userId here
          productId: product._id,
          quantity: 1,
        }
      );
      console.log("response",response);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };
  // Helper to generate a random pastel color
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`; // Soft pastel background
  };
  // If no enabled categories, show nothing
  if (!categories.length) return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">All Products</h1>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          key="All"
          onClick={() => handleCategoryChange("All")}
          className={`px-4 py-2 rounded-full border transition ${selectedCategory === "All"
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
            }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryChange(cat.name)}
            className={`px-4 py-2 rounded-full border transition ${selectedCategory === cat.name
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Product    */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, idx) => {
          const desc = product.description || "";
          const isLong = desc.length > 200; // adjust as needed for 2 lines
          console.log("product.category:", product.category);
          return (
            <div
              key={product._id}
              ref={el => (cardsRef.current[idx] = el)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <p className="text-primary font-bold text-xl mb-2">${product.price}</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(product.category) && product.category.map((cat, idx) => {
                    if (typeof cat === "object" && cat !== null) {
                      // Populated object
                      return (
                        <span
                          key={cat._id || idx}
                          style={{ backgroundColor: getRandomColor() }}
                          className="text-sm text-gray-800 px-3 py-1 rounded-full"
                        >
                          {cat.name}
                        </span>
                      );
                    } else {
                      // ID, match with categories array
                      const matchedCategory = categories.find((c) => c._id === cat);
                      return (
                        <span
                          key={cat}
                          style={{ backgroundColor: getRandomColor() }}
                          className="text-xs text-gray-800 px-3 py-1 rounded-full"
                        >
                          {matchedCategory ? matchedCategory.name : "Unknown"}
                        </span>
                      );
                    }
                  })}
                </div>
                <p className="pt-2 text-gray-600 text-xs font-sans flex-1 line-clamp-3">
                  {desc}
                </p>
                {isLong && (
                  <button
                    className="text-blue-600 text-xs mt-1 underline"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    See more
                  </button>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
                      }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className={`px-3 py-1 rounded bg-primary text-white text-sm font-semibold transition hover:bg-primary-dark ${product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No products found.</div>
      )}
    </div>
  );
};

export default Products;
