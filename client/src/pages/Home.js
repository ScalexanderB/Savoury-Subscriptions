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
    
      <section className='home-section p-3 about-us'>
        <span>
          About Us!
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </span>
        <span>
        
        </span>
      </section>

      <section className='home-section p-3'>
        <span>🤘 Let's Get Savoury!! 🤘</span>
      </section>

    </div>    
  );
};

export default Home;
