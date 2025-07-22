// src/pages/user/Products.jsx
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { products, categories } from "../../data/products";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productList, setProductList] = useState(products); // <-- renamed
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, [productList, selectedCategory]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      setProductList(products);
    } else {
      setProductList(products.filter((p) => p.category === cat));
    }
  };

  const handleAddToCart = (product) => {
    toast.success(`Added "${product.name}" to cart!`);
    // Here you would update cart state/context
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">All Products</h1>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productList.map((product, idx) => (
          <div
            key={product.id}
            ref={el => (cardsRef.current[idx] = el)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-primary font-bold mb-2">₹{product.price}</p>
              <p className="text-gray-500 text-sm mb-2">{product.category}</p>
              <p className="text-gray-600 text-xs flex-1">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`text-xs font-medium ${
                    product.inStock ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`px-3 py-1 rounded bg-primary text-white text-sm font-semibold transition hover:bg-primary-dark ${
                    !product.inStock ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {productList.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No products found.</div>
      )}
    </div>
  );
};

export default Products;
