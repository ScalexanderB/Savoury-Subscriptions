import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logoImage from '../assets/images/savoury-logo2.png';
import "../../pages/style.css"

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
      <div className="navbar nav">
        <ul className="flex-row space-between">
          <div className="logo">
              <Link to="/">
                  <img src={logoImage} alt="Savoury Logo"/>
              </Link>
          </div>
          <li className="mx-1">
            <Link to="/meals">
              Meals
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/myprofile">
              My Account 
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </div>  
      );
    } else {
      return (
      <div className="navbar">
        <ul className="flex-row space-between">
          <div className="logo">
              <Link to="/">
                <img src={logoImage} alt="Savoury Logo"/>
              </Link>
          </div> 
          <li className="mx-1">
            <Link to="/meals">
              Meals
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
      );
    }
  }

  return (
    <header className="flex-row px-1">

      <nav>
        {showNavigation()}
      </nav>

    </header>
  );
}

export default Nav;
