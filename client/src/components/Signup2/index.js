import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

function Signup2(props) {
  const [formState, setFormState] = useState({ address1: '', address2: '', city: '', province: '', postalCode: '', errMsg: '' });
  const [updateUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await updateUser({
      variables: {
        addressLine: [formState.address1,formState.address2],
        city: formState.city,
        province: formState.province,
        postalCode: formState.postalCode
      },
    })    
    .catch(err=> {
      setFormState({     
         ...formState,
         'errMsg': "Something went wrong with your signup!"
      });
   });

   if(mutationResponse){
     // Signup is done redirect the user somewhere special
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

  return (
    <>  
  <div className="offcanvas offcanvas-top" data-bs-scroll="true" tabIndex="-1" id="popDownSignup2" aria-labelledby="popDownSignup2Label" style={{height:"25rem"}}>
    <div className="offcanvas-header">
      <h4 className="offcanvas-title centeredForm" id="popDownSignup2Label">Almost Done!</h4>
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
  
    <div className="offcanvas-body centeredForm">
    <h5>Please enter your address</h5>
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

export default Signup2;
