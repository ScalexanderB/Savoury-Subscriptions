import React from "react";
import { Link } from "react-router-dom";
import './style.css';

import Header from "../components/Header"

const linkStyle = {
  textDecoration: "none",
  color: 'var(--dark)'
};


const Home = () => {

  return (
    <div className="container">
      <Header />

    
      <div className="bigBannerBlock">
        <Link to="/meals" style={linkStyle}>
          <span>Add Meals NOW!!</span>
        </Link>
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
