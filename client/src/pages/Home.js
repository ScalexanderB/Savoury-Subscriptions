import React from "react";
import { Link } from "react-router-dom";
import './style.css';

import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {

  return (
    <div className="container">
      <Header />
    
      <section className='home-section py-2'>
        <Link to="/meals">
          <span>Add Meals NOW!!</span>
        </Link>
      </section>
    
      <section className='home-section py-2'>
        <span>About Us!</span>
      </section>

      <section className='home-section py-2'>
        <span>🤘 Let's Get Savory!! 🤘</span>
      </section>

    </div>
  
    
  );
};

export default Home;
