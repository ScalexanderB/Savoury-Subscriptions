import React from "react";
import { Link } from "react-router-dom";
import './style.css';

import Header from "../components/Header";

const Home = () => {

  return (
    <div>
      <Header />
    
      <section className='home-section p-3'>
        <Link to="/meals">
          <span>Add Meals NOW!!</span>
        </Link>
      </section>
    
      <section className='home-section p-3'>
        <span>About Us!</span>
      </section>

      <section className='home-section p-3'>
        <span>🤘 Let's Get Savoury!! 🤘</span>
      </section>

    </div>    
  );
};

export default Home;
