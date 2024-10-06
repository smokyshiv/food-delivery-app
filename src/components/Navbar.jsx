import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Link to external CSS file
import OrderHistory from './OrderHistory';

const Navbar = ({scrollToAbout}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-text">🍔 FoodOrder</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-item">Home</Link>
        </li>
        <li>
          <Link to="/orderhistory" className="nav-item">OrderHistory</Link>
        </li>
        <li>
          <Link to="/menu" className="nav-item">Menu</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
