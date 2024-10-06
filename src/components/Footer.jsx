import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <>
      <div class="footer-content">
        <div class="footer-section">
          <h3>About Us</h3>
          <p>We serve the best food in town!</p>
        </div>
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@foodorderingapp.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-media">
            <a
              href="#"
              target="_blank">
              Facebook
            </a>
            <a
              href="#"
              target="_blank">
              Twitter
            </a>
            <a
              href="#"
              target="_blank">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <p class="footer-bottom">
        &copy; 2024 Food Ordering App. All rights reserved.
      </p>
    </>
  );
};

export default Footer;
