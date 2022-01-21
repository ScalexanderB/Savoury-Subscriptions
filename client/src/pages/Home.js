import React from "react";
import './style.css';

import Header from "../components/Header"


const Home = () => {

  return (
    <div className="container">
      <Header />

    <div className="bigBannerBlock">
      <span>Add Meals NOW!!</span>
    </div>

    <div className="bigBannerBlock">
      <span>About Us!</span>
    </div>

    <div className="bigBannerBlock">
      <span>🤘 Let's Get Savory!! 🤘</span>
    </div>

    </div>
  );
};

export default Home;
