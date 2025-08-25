// frontend/pages/PaymentSuccess.jsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("tracker");

    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/transactions/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Payment verified:", data);
          // ✅ yahan order ko DB me save kar do
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return <h1>Payment Success</h1>;
}

export default PaymentSuccess;
