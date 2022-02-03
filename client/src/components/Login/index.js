import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const signupClick = () =>{
    document.getElementById('SignupButton').click();
  }

  return (
  <>  
<div className="offcanvas offcanvas-top" data-bs-scroll="true" tabIndex="-1" id="popDownLogin" aria-labelledby="popDownLoginLabel" style={{height:"20rem"}}>
  <div className="offcanvas-header">
    <h4 className="offcanvas-title centeredForm" id="popDownLoginLabel">User Login</h4>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>

  <div className="offcanvas-body centeredForm">
    <button className='loginToggle highlight'  data-bs-dismiss="offcanvas" data-mdb-toggle="offcanvas" data-mdb-target="#popDownSignUp"
  aria-controls="offcanvasExample" onClick={signupClick}>← Go to Signup</button>
 
    <form onSubmit={handleFormSubmit} >
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="your@email.com"
            name="email"
            type="email"
            id="lemail"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="********"
            name="password"
            type="password"
            id="lpwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button className="submit highlight" style={{marginLeft:"77%"}} type="submit">Submit</button>
        </div>
      </form>


  </div>
</div>
  </>
  );
}

export default Login;
