// src/pages/user/Products.jsx
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabledButtons, setDisabledButtons] = useState({});
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products and enabled categories from backend
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/enabled`);
        const { products, categories } = res.data.data;
        
        // Add 2 second delay
        setTimeout(() => {
          setProductList(products);
          setCategories(categories);
          setLoading(false);
          console.log(categories);
        }, 2000);
        
      } catch (error) {
        console.error("Failed to fetch products or categories", error);
        setLoading(false);
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
      setDisabledButtons(prev => ({ ...prev, [product._id]: true }));

      const user = JSON.parse(localStorage.getItem('userInfo'));
      const userId = user?.id;
      console.log("userId", userId);

      if (!userId) {
        toast.error('User not logged in');
        setDisabledButtons(prev => ({ ...prev, [product._id]: false }));
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/cart/add`,
        {
          userId,
          productId: product._id,
          quantity: 1,
        }
      );
      console.log("response", response);
      toast.success('Added to cart!');
      
      // Reset button after 2 seconds on success
      setTimeout(() => {
        setDisabledButtons(prev => ({ ...prev, [product._id]: false }));
      }, 1000);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      // Reset button immediately on error
      setDisabledButtons(prev => ({ ...prev, [product._id]: false }));
    }
  };

  // Helper to generate a random pastel color
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <PuffLoader
            height="150"
            width="150"
            radius={1}
            color="#00809D"
          />
        </div>
      </div>
    );
  }

  // If no enabled categories, show nothing
  if (!categories.length) return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-newPrimary">All Products</h1>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          key="All"
          onClick={() => handleCategoryChange("All")}
          className={`px-4 py-2 rounded-full border transition ${selectedCategory === "All"
              ? "bg-newPrimary text-white border-newPrimary"
              : "bg-white text-newPrimary border-newPrimary hover:bg-newPrimary hover:text-white"
            }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryChange(cat.name)}
            className={`px-4 py-2 rounded-full border transition ${selectedCategory === cat.name
                ? "bg-newPrimary text-white border-newPrimary"
                : "bg-white text-newPrimary border-newPrimary hover:bg-newPrimary hover:text-white"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, idx) => {
          const desc = product.description || "";
          const isLong = desc.length > 200;
          return (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              ref={el => (cardsRef.current[idx] = el)}
              className="bg-white rounded-lg cursor-pointer shadow hover:shadow-lg transition flex flex-col"
            >
             <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <p className="text-newPrimary font-bold text-xl mb-2">${product.price}</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(product.category) && product.category.map((cat, idx) => {
                    
                    if (typeof cat === "object" && cat !== null) {
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
                  <button onClick={() => navigate(`/products/${product._id}`)}>
                    See more
                  </button>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0 || disabledButtons[product._id]}
                    className={`px-3 py-1 rounded bg-newPrimary text-white text-sm font-semibold transition hover:bg-newPrimaryDark ${product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {disabledButtons[product._id] ? "Adding..." : "Add to Cart"}
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
