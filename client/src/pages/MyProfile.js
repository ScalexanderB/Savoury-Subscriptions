import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function MyProfile() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Home</Link>

        {user ? (
          <>
          <h2>User Profile Goes Here</h2>
            <h2>
              Subscription list for {user.firstName} {user.lastName}
            </h2>
            {user.subscription.map((subscription) => (
              <div key={subscription._id} className="my-2">
                <h3>
                  {new Date(parseInt(subscription.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
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
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default MyProfile;
