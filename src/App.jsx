import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import { Toaster } from 'react-hot-toast';

function App() {
 return (
   <>
     <Toaster position="top-right" />
     <Router>
       <div className="min-h-screen bg-gray-50">
         <Navbar />
         <Routes>
           <Route path="/" element={<Menu />} />
           <Route path="/cart" element={<Cart />} />
         </Routes>
       </div>
     </Router>
   </>
 );
};
export default App;