import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { loadStripe } from "@stripe/stripe-js";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // [{product, quantity}]
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('userInfo'));
  const userId = user?.id || user?._id;

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      if (!userId) {
        console.warn("No userId found, skipping cart fetch.");
        setLoading(false);
        return;
      }
      try {
        const cartRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/${userId}`);
        console.log("cartRes",cartRes);
        const cart = cartRes.data;

        // If your backend returns { success: true, data: { items: [...] } }
        const items = cart.items || cart.data?.items || [];

        // Now map over items
        const cartWithDetails = items.map(cartItem => {
          const product = cartItem.productId;
          if (!product) {
            console.warn(`❌ Product not found for cartItem:`, cartItem);
            return null;
          }
          return { ...product, quantity: cartItem.quantity };
        }).filter(Boolean);

        setCartItems(cartWithDetails);
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
        toast.error("Failed to load cart.");
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const metadata = {
        userId: user ? String(user.id || user._id) : '',
        products: JSON.stringify(cartItems),
      };

      const stripe = await loadStripe('pk_test_51RCbym06lnKgfmZllfMOsMHVzBLEnIcbrlQUvljCNulwZcebY1bCMQJ1qIs3SS9G0dgQlAFIjhH20pAfloKcFvid00rG10oCCi');

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user ? String(user.id || user._id) : '',
            items: cartItems.map((item) => ({
              name: item.name,
              image: item.images?.[0]?.url,
              price: item.price ,
              quantity: item.quantity,
            })),
            success_url: `${window.location.origin}/success`,
            cancel_url: `${window.location.origin}/cart`,
            metadata,
          }),
        }
      );

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Stripe checkout failed");
        setCheckoutLoading(false);
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      toast.error("Something went wrong during checkout.");
      setCheckoutLoading(false);
    }
  };

  const handleQuantityChange = (productId, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, Math.min(item.quantity + delta, item.stock)) }
          : item
      )
    );
    // Optionally: send update to backend here
  };

  const handleRemove = async (productId) => {
    try {
      const userId = user ? String(user.id || user._id) : '';
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
        },
        body: JSON.stringify({ userId, productId }),
      });
console.log("response",response);
      if (response.ok) {
        setCartItems(prev => prev.filter(item => item._id !== productId));
        toast.info("Item removed from cart");
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      toast.error("Error removing item from cart");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <PuffLoader color="#00c7fc" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty.
          <div className="mt-4">
            <Link
              to="/products"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded shadow p-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b py-4 last:border-b-0"
                >
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-primary font-bold">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span className="px-3">
                        {isNaN(item.quantity) ? 1 : item.quantity}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(item._id, +1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>

                      <span
                        className={`ml-4 text-xs font-medium ${
                          item.stock ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {item.stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                    <div className="mt-2 font-semibold">
                      ${item.price * item.quantity || "0"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded shadow p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="block mt-6 w-full text-center bg-primary text-white py-2 rounded hover:bg-primary-dark font-semibold disabled:opacity-50"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
                  <span className="flex items-center justify-center">
                    <PuffLoader color="#fff" size={24} className="mr-2" />
                    Processing...
                  </span>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
