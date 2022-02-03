import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '', errMsg:'' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    })
    .catch(err=> {
       setFormState({     
          ...formState,
          'errMsg': "Something went wrong with your signup!"
       });
    });
   
    if(mutationResponse){
      const token = mutationResponse.data.addUser.token;
      if(token){
        document.getElementById('SignupClose').click();
        Auth.firstLogin(token, document.getElementById('SignupPg2'));
      }
      else{
        console.log(mutationResponse);
      
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const loginClick = () =>{
    document.getElementById('LoginButton').click();
  }

  return (
    <>  
  <div className="offcanvas offcanvas-top" data-bs-scroll="true" tabIndex="-1" id="popDownSignUp" aria-labelledby="popDownSignUpLabel" style={{height:"23rem"}}>
    <div className="offcanvas-header">
      <h4 className="offcanvas-title centeredForm" id="popDownSignUpLabel">User Signup</h4>
      <button id="SignupClose" type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div className="offcanvas-body centeredForm">

      <button className='loginToggle highlight'  data-bs-dismiss="offcanvas" data-mdb-toggle="offcanvas" data-mdb-target="#popDownLogin"
  aria-controls="offcanvasExample" onClick={loginClick}>← Go to Login</button>
   
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="your@email.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="********"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button className="submit highlight" style={{marginLeft:"77%"}} type="submit">Submit</button>
        </div>
        {formState.errMsg ? <>
          <div className="flex-row justify-center" style={{color:"var(--bs-danger)"}}>
          {formState.errMsg}
        </div>
          </> : <></>}
      </form>
    </div>
  </div>  
    </>
    );
}

export default Signup;
