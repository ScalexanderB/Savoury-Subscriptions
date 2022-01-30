import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logoImage from '../assets/images/savoury-logo-transparent.png';
import "../../pages/style.css"
import Login from "../Login";
import Signup from "../Signup";

function Nav() {
  return (
    <header className='flex-row px-2'>
      <div>
        <a href='/'>
          <img className='nav-logo' src={logoImage} alt='Savoury Subscriptions logo' />
        </a>
      </div>
      <nav className='flex-row'>
        {Auth.loggedIn() ? (
          <>
            <Link to='/meals'>Meals</Link>
            <Link to='/myprofile'>Account</Link>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to='/meals'>Meals</Link>
            <button id="SignupButton" className="login-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#popDownSignUp" aria-controls="popDownSignUp">
              Signup
            </button>
            <button id="LoginButton" className="login-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#popDownLogin" aria-controls="popDownLogin">
              Login
            </button>
          </>
        )}
      </nav>
      <Login /> <Signup />
    </header>
  )
}

export default Nav;
