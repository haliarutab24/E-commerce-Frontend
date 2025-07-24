import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
        setProduct(res.data.data);
        console.log("Product Response", res.data);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error(err);
        navigate("/not-found"); // or handle differently
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
        // Ensure response structure is correct
        const categoryArray = res.data?.data ?? res.data; // adjust based on actual backend structure
        setCategories(Array.isArray(categoryArray) ? categoryArray : []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
  
    fetchCategories();
  }, []);
  
  


  const handleAddToCart = async () => {
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
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <PuffLoader color="#00c7fc" />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }
  // Helper to generate a random pastel color
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`; // Soft pastel background
  };


  return (
    <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
      {/* Image Section */}
      <div className="flex-1 flex flex-col items-center">
        <img
          src={product.images?.[imageIndex]?.url || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full max-w-md h-[750px] object-cover rounded-lg shadow"
        />
        {/* Thumbnails */}
        {product.images?.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`thumbnail-${idx}`}
                onClick={() => setImageIndex(idx)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${idx === imageIndex ? "border-primary" : "border-gray-300"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <p className="text-primary text-2xl font-semibold mb-2">${product.price}</p>

        {/* Category badges with random colors */}
        <div className="mb-4 flex flex-wrap gap-2">
          {product.category?.map((catId, idx) => {
            const matchedCategory = categories.find((cat) => cat._id === catId);
            return (
              <span
                key={idx}
                style={{ backgroundColor: getRandomColor() }}
                className="text-sm text-gray-800 px-3 py-1 rounded-full"
              >
                {matchedCategory ? matchedCategory.name : "Unknown"}
              </span>
            );
          })}
        </div>

        {/* Color badges with random colors */}
        <div className="mb-4 flex flex-wrap gap-2">
          {product.color?.map((color, idx) => (
            <span
              key={idx}
              style={{ backgroundColor: getRandomColor() }}
              className="text-sm text-gray-800 px-3 py-1 rounded-full"
            >
              {color.trim()}
            </span>
          ))}
        </div>



        {/* Description as bullet points */}
        <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
          {product.description
            ?.split(".")
            .filter(Boolean)
            .map((line, i) => (
              <li key={i}>{line.trim()}</li>
            ))}
        </ul>

        {/* Stock Info */}
        <span
          className={`inline-block mb-4 text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-6 py-2 rounded bg-primary text-white font-semibold transition hover:bg-primary-dark ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Add to Cart
          </button>
          <Link
            to="/products"
            className="px-6 py-2 rounded border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
