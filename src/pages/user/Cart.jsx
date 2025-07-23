import React, { useState } from "react";
import { products } from "../../data/products";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [cart, setCart] = useState(products);
  const user = JSON.parse(localStorage.getItem('userInfo'));
  console.log(user.id);

  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== id) return item;

        const currentQuantity = Number(item.quantity) || 1;
        const maxStock = Number(item.stock) || 1;
        const newQuantity = currentQuantity + delta;

        return {
          ...item,
          quantity: Math.max(1, Math.min(newQuantity, maxStock)),
        };
      })
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const handleCheckout = async () => {
    const metadata = {
      userId: user ? String(user.id) : '',
      products: JSON.stringify(cart),
    };
    console.log('Stripe metadata:', metadata);

    const stripe = await loadStripe('pk_test_51RCbym06lnKgfmZllfMOsMHVzBLEnIcbrlQUvljCNulwZcebY1bCMQJ1qIs3SS9G0dgQlAFIjhH20pAfloKcFvid00rG10oCCi');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user ? String(user.id) : '',
            items: cart.map((item) => ({
              name: item.name,
              image: item.image,
              price: Math.round(item.price * 100),
              quantity: item.quantity,
            })),
            success_url: `${window.location.origin}/success`,
            cancel_url: `${window.location.origin}/cart`,
            metadata,
          }),
        }
      );

      console.log(response);
      

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Stripe checkout failed");
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      toast.error("Something went wrong during checkout.");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Your Cart
      </h1>
      {cart.length === 0 ? (
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
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b py-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-primary font-bold">Rs.{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span className="px-3">
                        {isNaN(item.quantity) ? 1 : item.quantity}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(item.id, +1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>

                      <span
                        className={`ml-4 text-xs font-medium ${
                          item.inStock ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                    <div className="mt-2 font-semibold">
                      Rs.{item.price * item.quantity || "0"}
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
                <span>Rs.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Rs.0</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>Rs.{subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="block mt-6 w-full text-center bg-primary text-white py-2 rounded hover:bg-primary-dark font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
