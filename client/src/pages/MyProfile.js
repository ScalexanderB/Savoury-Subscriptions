import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function MyProfile() {
   const { data, loading } = useQuery(QUERY_USER);
   let user;

   if (data) {
     user = data.user;
   }

   if (loading) {
     return <div>loading...</div>
   }

  return (
    <>
      <div className="container my-4">
        <Link to="/">← Back to Home</Link>
        <h1 className='mb-3'>Account</h1>
        {user ? (
          <>
            <div className='flex-row justify-space-around align-center account-info mb-3'>
              <span className='account-emoji' role='img' aria-label='face savoring food'>😋</span>
              <div>
                <h5>Account Holder: <span>{user.firstName} {user.lastName}</span></h5>
                <h5 className='mb-0'>Email: <span>{user.email}</span></h5>
              </div>
            </div>

            {user.subscription.length ? (
              <div className="flex-row">
                {user.subscription.map((subscription) => (
                  <div key={subscription._id} className="my-2">
                    <h3>
                      {new Date(parseInt(subscription.purchaseDate)).toLocaleDateString()}
                    </h3>
                      {subscription.products.map(({ _id, image, name, price }, index) => (
                        <div key={index} className="card px-1 py-1">
                          <Link to={`/meal/${_id}`}>
                            <img alt={name} src={`/images/${image}`} />
                            <p>{name}</p>
                          </Link>
                          <div>
                            <span>price: ${price}</span>
                            
                          </div>
                          <div><span>quantity: {subscription.quantities[index]}</span></div>
                        </div>
                      ))}

                    </div>
                ))}
              </div>
            ) : (
              <div>
                <h2 className='mb-3'>Start your subscription!</h2>
                <form className='sub-form flex-column'>
                  <p>Select any dietary restrictions that apply to you:</p>
                  <div className='mx-3'>
                    <label htmlFor='veg'>Vegetarian</label>
                    <input name='veg' type='checkbox' />
                  </div>
                  <div className='mx-3'>
                    <label htmlFor='dairy'>Dairy Free</label>
                    <input name='dairy' type='checkbox' />
                  </div>
                  <div className='mx-3'>
                    <label htmlFor='gluten'>Gluten Free</label>
                    <input name='gluten' type='checkbox' />
                  </div>
                  <button className='mt-3' type='submit'>Start Subsciption</button>
                </form>
              </div>
            )}
          </>
        ) : (
          <h4>
            You need to be logged in to see this page. Use the navigation links above to sign up of login!
          </h4>
        )}
      </div>
    </>
  );
}

export default MyProfile;
