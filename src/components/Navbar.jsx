import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  ChefHat,
  Coffee,
  Utensils,
  Home,
  Menu as MenuIcon
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link 
            to="" 
            className="flex items-center space-x-2 text-blue-600 transition-colors cursor-pointer"
          >
            <ChefHat className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">Restaurant Name</span>
            <Utensils className="h-6 w-6 text-blue-600" />
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MenuIcon className="h-5 w-5" />
              <span>Menu</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
