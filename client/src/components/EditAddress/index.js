import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

function EditAddress(props) {
  const [formState, setFormState] = useState({ address1: '', address2: '', city: '', province: '', postalCode: '', errMsg: '' });
  const [updateUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    let theUpdates = {};
    if (formState.address1)theUpdates.addressLine = [formState.address1];
    if (formState.address2)theUpdates.addressLine[1] = formState.address2;
    if (formState.city)theUpdates.city = formState.city;
    if (formState.province)theUpdates.province = formState.province;
    if (formState.postalCode)theUpdates.postalCode = formState.postalCode;
    if (!theUpdates){
       setFormState({     
       ...formState,
       'errMsg': "Something went wrong with your edit!"
   });
  return 0;
  };
   
   

    const mutationResponse = await updateUser({
      variables: {
        ...theUpdates
      },
    })    
    .catch(err=> {
      setFormState({     
         ...formState,
         'errMsg': "Something went wrong with your edit!"
      });
   });

   if(mutationResponse){
    document.getElementById("EditAddressClose").click();
   }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // const editClick = () =>{
  //   document.getElementById('EditButton').click();
  // }

  return (
    <>  
  <div className="offcanvas offcanvas-top" data-bs-scroll="true" tabIndex="-1" id="popDownSignup2" aria-labelledby="popDownSignup2Label" style={{height:"25rem"}}>
    <div className="offcanvas-header">
      <h4 className="offcanvas-title centeredForm" id="popDownSignup2Label">Update your Address!</h4>
      {/* <button className='loginToggle highlight'  data-bs-dismiss="offcanvas" data-mdb-toggle="offcanvas" data-mdb-target="#popDownLogin"
  aria-controls="offcanvasExample" >← Go Back</button> */}
      <button id="EditAddressClose" type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      
    </div>

    
  
    <div className="offcanvas-body centeredForm">
    <h5>Please enter your new address</h5>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="address1">Address:</label>
          <input
            placeholder="Address Line 1"
            name="address1"
            type="address1"
            id="address1"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="address2">Address:</label>
          <input
            placeholder="Address Line 2"
            name="address2"
            type="address2"
            id="address2"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="city">City:</label>
          <input
            placeholder="Hungryville"
            name="city"
            type="city"
            id="city"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="province">Province:</label>
          <input
            placeholder="Ontario"
            name="province"
            type="province"
            id="province"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row justify-space-between my-2">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            placeholder="L7E 46C"
            name="postalCode"
            type="postalCode"
            id="postalCode"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button className="submit highlight" style={{marginLeft:"77%", color: "white"}} type="submit">Submit</button>
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

export default EditAddress;
