import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll start preparing it right away.
        </p>
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-green-700">
            Your order number: #123456
          </p>
        </div>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
