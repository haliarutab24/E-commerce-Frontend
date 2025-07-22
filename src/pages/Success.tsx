import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Success: React.FC = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
    toast.success('Payment successful! Order confirmed.');
  }, [clearCart]);

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  return (
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

        {/* Order Details */}
        <div className="bg-card rounded-lg shadow-card p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-semibold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span>Stripe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-success font-semibold">Confirmed</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Order Processing</h4>
              <p className="text-muted-foreground">
                We'll prepare your items for shipment
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Shipping</h4>
              <p className="text-muted-foreground">
                Your order will be shipped within 2-3 days
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Tracking Info</h4>
              <p className="text-muted-foreground">
                You'll receive tracking details via email
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn-secondary">
            View My Orders
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Questions about your order? Contact us at{' '}
            <a href="mailto:support@shophub.com" className="text-primary hover:text-primary-hover">
              support@shophub.com
            </a>{' '}
            or call{' '}
            <a href="tel:+1-555-0123" className="text-primary hover:text-primary-hover">
              (555) 012-3456
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;