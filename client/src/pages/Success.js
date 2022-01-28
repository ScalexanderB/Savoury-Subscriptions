import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {ADD_SUBSCRIPTION} from '../utils/mutations'
import { idbPromise } from '../utils/helpers';
import Header from '../components/Header';

function Success() {
    const [addSubscription] = useMutation(ADD_SUBSCRIPTION);

    useEffect(() => {
    async function saveSubscription() {
        const cart = await idbPromise('cart', 'get');
        const meals = cart.map(item => item._id);
        const quantities = cart.map(item => item.quantity);

        if (meals.length) {
            const { data } = await addSubscription({ variables: { meals, quantities } });
            const mealData = data.addSubscription.meals;
          
            mealData.forEach((item) => {
              idbPromise('cart', 'delete', item);
            });
          }
    }

    saveSubscription();

    setTimeout(() => {
        window.location.assign('/');
    }, 3000);

    }, [addSubscription]);

    return (
      <div>
        <Header>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
        </Header>
      </div>
    );
  };

  export default Success;