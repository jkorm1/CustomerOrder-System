import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    ShoppingCart, 
    Menu as MenuIcon, 
    Search, 
    ChefHat,
    Coffee,
    Utensils,
    DollarSign,
    Plus,
    Minus,
    Trash2,
    Info,
    Star,
    Clock,
    Filter
} from 'lucide-react';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const defaultImage = "https://via.placeholder.com/400x300?text=Food+Item";

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/menu');
                setMenuItems(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching menu:', error);
                setError('Failed to load menu items');
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const handleAddToCart = (item) => {
        console.log('Adding to cart:', item);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
    );
    
    if (error) return (
        <div className="text-center text-red-500 p-4">
            <Info className="inline-block mr-2" size={24} />
            Error: {error}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                    <MenuIcon className="text-blue-500" size={24} />
                    <h1 className="text-3xl font-bold">Our Menu</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search menu..."
                            className="pl-10 pr-4 py-2 border rounded-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <button className="relative">
                        <ShoppingCart className="text-blue-500" size={24} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            0
                        </span>
                    </button>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <div className="relative h-48">
                            <img 
                                src={item.image || defaultImage} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    console.log('Image failed to load:', item.image);
                                    e.target.src = defaultImage;
                                }}
                            />
                            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 m-2 rounded-full flex items-center">
                                <DollarSign size={16} className="mr-1" />
                                {item.price.toFixed(2)}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                <div className="flex items-center text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                    <span className="ml-1">4.5</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 flex items-center">
                                <ChefHat size={16} className="mr-2" />
                                {item.description || `Delicious ${item.name}`}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <Minus size={20} className="text-blue-500" />
                                    </button>
                                    <span className="font-semibold">1</span>
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <Plus size={20} className="text-blue-500" />
                                    </button>
                                </div>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center space-x-2"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <ShoppingCart size={20} />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;