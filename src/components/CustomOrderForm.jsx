import React, { useState } from 'react';
import { Button } from './ui/button';

const CustomOrderForm = ({ onAddToCart }) => {
    const [container, setContainer] = useState({
        packaging_type: 'basket',
        message: '',
        food_items: [{
            food_name: '',
            price: '',
            quantity: 1,
            special_instructions: ''
        }]
    });

    const addFoodItem = () => {
        setContainer(prev => ({
            ...prev,
            food_items: [...prev.food_items, {
                food_name: '',
                price: '',
                quantity: 1,
                special_instructions: ''
            }]
        }));
    };

    const updateFoodItem = (index, field, value) => {
        setContainer(prev => ({
            ...prev,
            food_items: prev.food_items.map((item, i) => {
                if (i !== index) return item;
                
                // Handle quantity specifically
                if (field === 'quantity') {
                    const qty = parseInt(value) || 1; // Default to 1 if invalid
                    return {...item, quantity: Math.max(1, qty)}; // Ensure minimum of 1
                }
                
                // Handle price specifically
                if (field === 'price') {
                    const price = value === '' ? '' : parseFloat(value) || 0;
                    return {...item, price};
                }
                
                // Handle other fields normally
                return {...item, [field]: value};
            })
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddToCart(container);
        // Reset form
        setContainer({
            packaging_type: 'basket',
            message: '',
            food_items: [{
                food_name: '',
                price: '',
                quantity: 1,
                special_instructions: ''
            }]
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-lg">
            {/* Container Details */}
            <div className="space-y-4">
                <select
                    value={container.packaging_type}
                    onChange={(e) => setContainer({...container, packaging_type: e.target.value})}
                    className="w-full p-2 border rounded"
                >
                    <option value="basket">Basket</option>
                    <option value="plate">Plate</option>
                    <option value="box">Box</option>
                </select>

                <textarea
                    placeholder="Container Message/Instructions"
                    value={container.message}
                    onChange={(e) => setContainer({...container, message: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows="2"
                />
            </div>

            {/* Food Items */}
            {container.food_items.map((item, index) => (
                <div key={index} className="p-4 border rounded space-y-4">
                    <input
                        type="text"
                        placeholder="Food Item Name"
                        value={item.food_name}
                        onChange={(e) => updateFoodItem(index, 'food_name', e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <div className="flex gap-4">
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => updateFoodItem(index, 'price', e.target.value)}
                            className="w-1/2 p-2 border rounded"
                            min="0"
                            step="0.01"
                            required
                        />

                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => updateFoodItem(index, 'quantity', e.target.value)}
                            className="w-1/2 p-2 border rounded"
                            min="1"
                            required
                        />
                    </div>

                    <textarea
                        placeholder="Special instructions for this item"
                        value={item.special_instructions}
                        onChange={(e) => updateFoodItem(index, 'special_instructions', e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="2"
                    />
                </div>
            ))}

            <Button 
                type="button" 
                onClick={addFoodItem}
                className="w-full bg-gray-200 text-gray-800"
            >
                Add Another Item to Container
            </Button>

            <Button type="submit" className="w-full">
                Add Container to Cart
            </Button>
        </form>
    );
};

export default CustomOrderForm; 