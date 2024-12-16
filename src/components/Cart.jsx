import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const handleSubmitOrder = async () => {
    try {
      setIsLoading(true);

      // Format cart items for submission
      const orderData = {
        order_type: 'customer_online',
        payment: 'pending',
        location: 'Online Order',
        containers: cartItems.map(item => ({
          container_number: 1,
          packaging_type: item.packaging_type,
          message: '',
          FoodItems: [{
            food_name: item.food_name,
            Price: item.price
          }]
        }))
      };

      const response = await fetch('http://localhost:5000/api/submit-order?is_ordered=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      // Clear cart after successful submission
      localStorage.removeItem('cart');
      setCartItems([]);
      toast.success('Order submitted successfully!');

    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to submit order');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.food_name}</h3>
                    <p className="text-sm text-gray-600">₵{item.price}</p>
                    <p className="text-sm text-gray-600">{item.packaging_type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">₵{calculateTotal()}</span>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSubmitOrder}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Place Order'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;