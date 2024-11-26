import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
function App() {
 return (
   <Router>
     <div className="min-h-screen bg-gray-50">
       <Navbar />
       <Routes>
         <Route path="/" element={<Menu />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/confirmation" element={<OrderConfirmation />} />
       </Routes>
     </div>
   </Router>
 );
};
export default App;