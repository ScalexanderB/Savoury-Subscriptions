import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logoImage from '../assets/images/savoury-logo-transparent.png';
import "../../pages/style.css"
import Login from "../Login";
import Signup from "../Signup";
import Signup2 from '../Signup2';

function Nav() {
  return (
    <header>
      <div  className='home-link'>
        <a href='/'>
          <img className='nav-logo' src={logoImage} alt='Savoury Subscriptions logo' />
        </a>
      </div>

      <nav className='flex-row' style={{marginRight: "4rem"}}>
        {Auth.loggedIn() ? (
          <>
            <Link to='/meals'>Menu</Link>
            <Link to='/myprofile'>Account</Link>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </>
        ) : (
          <>
            <button id="SignupPg2" className="login-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#popDownSignup2" aria-controls="popDownSignup2" style={{display:"none"}}>
              Im a hidden link to page 2 of the sign up
            </button>
            <Link to='/meals'>Menu</Link>
            <button id="SignupButton" className="login-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#popDownSignUp" aria-controls="popDownSignUp">
              Signup
            </button>
            <button id="LoginButton" className="login-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#popDownLogin" aria-controls="popDownLogin">
              Login
            </button>
            <Login /> <Signup /> <Signup2 />
          </>
        )}
      </nav>
     
    </header>
  )
}

export default Nav;
