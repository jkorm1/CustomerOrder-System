import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
   // Fetch menu items from your backend
   axios.get('http://127.0.0.1:5000/menu')
     .then(response => setMenuItems(response.data))
     .catch(error => console.error('Error fetching menu:', error));
 }, []);
  const addToCart = (item) => {
   setCart([...cart, item]);
 };
  return (
   <div className="container mx-auto px-4 py-8">
     <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {menuItems.map((item) => (
         <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
           <img 
             src={item.image} 
             alt={item.name} 
             className="w-full h-48 object-cover rounded-md mb-4"
           />
           <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
           <p className="text-gray-600 mb-4">{item.description}</p>
           <div className="flex justify-between items-center">
             <span className="text-lg font-bold">${item.price}</span>
             <button
               onClick={() => addToCart(item)}
               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
             >
               Add to Cart
             </button>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};
export default Menu;