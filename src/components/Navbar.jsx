import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Restaurant Name
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/menu" className="text-gray-700 hover:text-gray-900">
              Menu
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-gray-900">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
