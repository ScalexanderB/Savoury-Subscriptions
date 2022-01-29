import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import {ADD_SUBSCRIPTION} from '../utils/mutations';

import { idbPromise } from '../utils/helpers';
import egg from '../egg-loading.gif'

function Success() {
    const [addSubscription] = useMutation(ADD_SUBSCRIPTION);
   
  useEffect(() => {
    async function saveSubscription() {
        const cart = await idbPromise('cart', 'get');
    
        const meals = cart.map(meal => {
          return {
            cartId: meal._id,
            name: meal.name,
            image: meal.image,
            ingredients: meal.ingredients,
            category: meal.category.map(id => id._id),
            quantity: parseInt(meal.quantity),
            price: parseFloat(meal.price)
          }
        });

        let categories = [];
        meals.map(meal=> meal.category.map(id=>{
          if(!categories.includes(id)) categories.push(id);
        }))

        if (meals.length) {
            const { data } = await addSubscription({ variables: { meals, categories } });
            const mealData = data.addSubscription.meals;
          
            mealData.forEach((item) => {
              item._id = item.cartId;
              idbPromise('cart', 'delete', item);
            });
          }
    }

    saveSubscription();

    setTimeout(() => {
       // window.location.assign('/');
    }, 3000);

    }, [addSubscription]);

    return (
      <div className='d-flex flex-column justify-center' style={{textAlign:"center", alignItems:'center'}}>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            We hope you enjoy your tasty meals!
          </h2>
        <img src={egg} width='480px'/>
      </div>
    );
  };

  export default Success;