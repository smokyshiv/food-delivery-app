import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './components/Menu';
import Home from './components/Home'; // Your Home component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlaceOrder from './components/PlaceOrder';
import OrderHistory from './components/OrderHistory';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/menu" element={<Menu />} /> 
        <Route path="/placeorder" element={<PlaceOrder/>} />
        <Route path="/orderhistory" element={<OrderHistory/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
