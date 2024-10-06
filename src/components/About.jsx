import React, { useRef } from 'react';
import Navbar from './Navbar';
import './About.css';
import pizza from '../../public/pizza.jpg'

const About = () => {
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
     
      <div className="home-content">
        {/* Other sections like Home or Orders */}
      </div>

      <section
        ref={aboutRef}
        id="about"
        className="about-section">
        <h2 className="about-title">About FoodOrder</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to <strong>FoodOrder</strong>, your one-stop destination
              for quick and convenient online food ordering. Whether you're
              craving delicious fast food, healthy options, or gourmet cuisine,
              we've got you covered! Our app makes it easier than ever to find
              and order food from your favorite restaurants.
            </p>
            <p>Why choose us?</p>
            <ul>
              <li>🍔 Wide variety of food options</li>
              <li>🚀 Fast delivery</li>
              <li>📱 Easy-to-use interface</li>
              <li>💸 Affordable prices and deals</li>
            </ul>
          </div>

          <div className="about-images">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
              alt="Burger"
            />

            <img
              src={pizza}
              alt="Pizza"
            />

            <img
              src="https://img.freepik.com/free-photo/gourmet-italian-bolognese-pasta-with-fresh-parmesan-generated-by-ai_188544-9453.jpg?t=st=1728222670~exp=1728226270~hmac=132f51b147dced303b1995c26361cff3672631777c70cc1161efc4860adf2863&w=1060"
              alt="Pasta"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
