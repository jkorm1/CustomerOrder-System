import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomOrderForm from './CustomOrderForm';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const addToCart = (container) => {
        if (!container.food_items || container.food_items.length === 0) {
            console.error('No food items in container');
            return;
        }

        container.food_items.forEach(item => {
            if (!item.food_name) {
                console.error('Food item missing name');
                return;
            }

            setCartItems(prev => [...prev, {
                name: item.food_name,
                price: parseFloat(item.price) || 0,
                quantity: parseInt(item.quantity) || 1,
                packaging_type: container.packaging_type || 'standard',
                message: container.message || '',
                special_instructions: item.special_instructions || ''
            }]);
        });
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const submitOrder = async () => {
        try {
            // Validate cart items
            if (cartItems.length === 0) {
                console.error('Cart is empty');
                return;
            }

            const orderData = {
                containers: [{
                    packaging_type: cartItems[0]?.packaging_type || 'standard',
                    message: cartItems[0]?.message || '',
                    food_items: cartItems.map(item => ({
                        food_name: item.name || 'Unknown Item',  // Ensure food_name is present
                        price: parseFloat(item.price) || 0,
                        quantity: parseInt(item.quantity) || 1
                    }))
                }]
            };

            console.log('Order Data:', JSON.stringify(orderData, null, 2));
            
            const response = await axios.post('http://127.0.0.1:5000/cards', orderData);
            
            if (response.status === 201) {
                console.log('Order submitted successfully:', response.data);
                setCartItems([]); // Clear cart
                navigate('/order-confirmation', { 
                    state: { orderId: response.data.order_id } 
                });
            }
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                data: error.response?.data
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Your Order</h2>
            
            {/* Custom Order Form */}
            <div className="mb-8">
                <h3 className="text-xl mb-4">Add Custom Item</h3>
                <CustomOrderForm onAddToCart={addToCart} />
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded">
                        <div>
                            <h4 className="font-bold">{item.food_name}</h4>
                            <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} × ${item.price}
                            </p>
                            {item.special_instructions && (
                                <p className="text-sm text-gray-500">
                                    Note: {item.special_instructions}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {cartItems.length > 0 && (
                <div className="mt-8">
                    <div className="text-xl font-bold mb-4">
                        Total: ${cartItems.reduce((sum, item) => 
                            sum + (parseFloat(item.price) * item.quantity), 0
                        ).toFixed(2)}
                    </div>
                    <button
                        onClick={submitOrder}
                        className="w-full bg-blue-600 text-white py-3 rounded"
                    >
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;