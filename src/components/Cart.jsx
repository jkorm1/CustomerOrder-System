import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomOrderForm from './CustomOrderForm';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const [containers, setContainers] = useState([]);
    const navigate = useNavigate();

    const addContainer = (newContainer) => {
        setContainers(prev => [...prev, newContainer]);
    };

    const removeContainer = (containerIndex) => {
        setContainers(prev => prev.filter((_, index) => index !== containerIndex));
    };

    const submitOrder = async () => {
        try {
            const orderData = {
                containers: containers.reduce((acc, container, index) => {
                    acc[`container_${index}`] = {
                        packaging_type: container.packaging_type,
                        message: container.message,
                        FoodItems: container.food_items
                    };
                    return acc;
                }, {})
            };

            console.log('Order data being sent:', JSON.stringify(orderData, null, 2));
            
            const response = await axios.post('http://127.0.0.1:5000/cards', orderData);
            
            toast.success(`Order placed successfully! Order ID: ${response.data.order_id}`);
            
            setContainers([]);
            
        } catch (error) {
            console.log('Error details:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };

    const calculateTotal = () => {
        return containers.reduce((total, container) => {
            const containerTotal = container.food_items.reduce((sum, item) => 
                sum + (parseFloat(item.price) * item.quantity), 0
            );
            return total + containerTotal;
        }, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Order</h2>

            {/* Form to add new container */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Add New Container</h3>
                <CustomOrderForm onAddToCart={addContainer} />
            </div>

            {/* Display existing containers */}
            {containers.map((container, containerIndex) => (
                <div key={containerIndex} className="mb-6 p-4 border rounded-lg bg-white shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold">
                            {container.packaging_type} #{containerIndex + 1}
                        </h4>
                        <button
                            onClick={() => removeContainer(containerIndex)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Remove Container
                        </button>
                    </div>

                    {/* Display items in this container */}
                    {container.food_items.map((item, itemIndex) => (
                        <div key={itemIndex} className="ml-4 mb-2 p-2 border-b">
                            <div className="flex justify-between">
                                <span>{item.food_name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                                {item.special_instructions && (
                                    <p className="text-xs italic">
                                        Note: {item.special_instructions}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}

                    {container.message && (
                        <p className="mt-2 text-sm text-gray-600 italic">
                            Message: {container.message}
                        </p>
                    )}
                </div>
            ))}

            {/* Order summary and submit button */}
            {containers.length > 0 && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold mb-4">
                        Total: ${calculateTotal()}
                    </div>
                    <button
                        onClick={submitOrder}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;