import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle className="w-12 h-12 text-success" />
      </div>
      {/* Success Message */}
      <h1 className="text-3xl lg:text-4xl font-bold mb-4">
        Payment Successful!
      </h1>
      <p className="text-muted-foreground text-lg mb-8">
        Thank you for your order. Your payment has been processed successfully.
      </p>
      {/* Continue Shopping Button */}
      <Link to="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
        Continue Shopping
      </Link>
    </div>
  </div>
);

export default Success;