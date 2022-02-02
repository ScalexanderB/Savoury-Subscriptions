import React from "react";
import { Link } from "react-router-dom";
import './style.css';

import Header from "../components/Header";

const Home = () => {

  return (
    <div>
      <Header />
    
      <section className='promo p-3 flex-column justify-center'>
        <h3 className='heading'>Savoury Meals, Delivered to Your Door</h3>
        <h4 className='subheading mt-3'>
          Delicious, healthy meal boxes 
          <br/>
          with pre-portioned ingredients 
          <br/>
          &amp; easy-to-follow recipes.
        </h4>
      </section>
    
      <section className='home-section p-3 my-3'>
        <h3 className='heading'>Meals that everyone can enjoy!</h3>
        <div className='flex-row justify-space-between mt-4'>
          <div className='meal-promo'>
            <img src={'/images/mac-cheese.jpg'} alt='macaroni and cheese' />
            <h4 className='subheading'>Vegetarian</h4>
          </div>

          <div className='meal-promo'>
            <img src={'/images/fried-rice.jpg'} alt='shrimp fried rice' />
            <h4 className='subheading'>Dairy Free</h4>
          </div>

          <div className='meal-promo'>
            <img src={'/images/stuffed-peppers.jpg'} alt='stuffed peppers' />
            <h4 className='subheading'>Gluten Free</h4>
          </div>
        </div>

          <Link className='home-btn mt-4' to='/meals'>Browse Our Menu</Link>
      </section>

    </div>    
  );
};

export default Home;
