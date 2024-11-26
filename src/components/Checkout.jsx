import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit order to backend
    navigate('/confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Delivery Address"
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
