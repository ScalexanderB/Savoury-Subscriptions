import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {ADD_SUBSCRIPTION} from '../utils/mutations';
import { CLEAR_CART } from '../utils/actions';

import { idbPromise } from '../utils/helpers';
import egg from '../egg-loading.gif'

function Success() {
    const [addSubscription] = useMutation(ADD_SUBSCRIPTION);
    const [, dispatch] = useStoreContext();

  useEffect(() => {
    async function saveSubscription() {
        const cart = await idbPromise('cart', 'get');
    
        // create object to match MealInput specs
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

        // create categories id array from all unique categories in meals
        const categories = [];
        meals.map(meal=> meal.category.map(id=>{
          if(!categories.includes(id)) return(id);
          return null
        }))

        if (meals.length) {
            const { data } = await addSubscription({ variables: { meals, categories } });
            const mealData = data.addSubscription.meals;
          
            mealData.forEach((item) => {
              item._id = parseInt(item.cartId);
              idbPromise('cart', 'delete', { ...item });
            });
            
            dispatch({type: CLEAR_CART});
          }
    }

    saveSubscription();

    setTimeout(() => {
      window.location.assign('/myprofile');
    }, 3000);

    }, [addSubscription, dispatch]);

    return (
      <div className='d-flex flex-column justify-center' style={{textAlign:"center", alignItems:'center'}}>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            We hope you enjoy your tasty meals!
          </h2>
        <img src={egg} width='480px' alt="Thank you! An egg is cracked in your honour!"/>
      </div>
    );
  };

  export default Success;