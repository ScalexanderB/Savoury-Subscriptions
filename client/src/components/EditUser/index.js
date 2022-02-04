import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

function EditUser(props) {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '', address1: '', address2: '', city: '', postalCode: '', errMsg: '' });
    const [updateUser] = useMutation(UPDATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await updateUser({
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
                'errMsg': 'Something went wrong with your edit!'
            });
        });

        if(mutationResponse){
            window.location.assign('/myprofile');
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const editClick = () =>{
        document.getElementById('EditButton').click();
      }

    return (
        <>
            <div className="offcanvas offcanvas-top" data-bs-scroll="true" tabIndex="-1" id="popDownSignUp" aria-labelledby="popDownSignUpLabel" style={{height:"23rem"}}>
    <div className="offcanvas-header">
      <h4 className="offcanvas-title centeredForm" id="popDownSignUpLabel">Update your Information</h4>
      <button id="SignupClose" type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div className="offcanvas-body centeredForm">

      <button className='loginToggle highlight'  data-bs-dismiss="offcanvas" data-mdb-toggle="offcanvas" data-mdb-target="#popDownLogin"
  aria-controls="offcanvasExample" onClick={editClick}>← Go Back</button>
   
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="firstName">Update your First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="lastName">Update your Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="email">Update your Email:</label>
          <input
            placeholder="your@email.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="pwd">Update your Password:</label>
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

export default EditUser;