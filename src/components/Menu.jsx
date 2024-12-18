import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "react-hot-toast";


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/menu-items?is_ordered=false');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      setError(error.message);
      toast.error('Failed to load menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(i => i.item_id === item.item_id);
    
    let newCart;
    if (existingItem) {
      newCart = existingCart.map(i => 
        i.item_id === item.item_id 
          ? {...i, quantity: i.quantity + 1}
          : i
      );
    } else {
      newCart = [...existingCart, { ...item, quantity: 1 }];
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success(`Added ${item.food_name} to cart`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {isLoading && <div className="text-center">Loading...</div>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.item_id} className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            {item.image_url && (
              <img src={item.image_url} alt={item.food_name} className="w-full h-48 object-cover mb-4" />
            )}
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-lg">{item.food_name}</h3>
              <p className="text-sm text-gray-600">₵{parseFloat(item.price).toFixed(2)}</p>
              <Badge variant="secondary" className="mt-2">{item.packaging_type}</Badge>
              <Button 
                onClick={() => addToCart(item)}
                disabled={isLoading}
                className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && menuItems.length === 0 && (
        <div className="text-center text-gray-500">
          No menu items available
        </div>
      )}
    </div>
  );
};

export default Menu;