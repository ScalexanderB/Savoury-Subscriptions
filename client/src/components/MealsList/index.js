import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MEALS } from '../../utils/actions';

import MealCard from '../MealCard';
import { QUERY_MEALS } from '../../utils/queries';
import { idbPromise } from "../../utils/helpers";

import spinner from "../../egg-loading.gif"


function MealsList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;
  
  let { loading, data } = useQuery(QUERY_MEALS);
  
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: UPDATE_MEALS,
        meals: data.meals
      });
  
      // but let's also take each meal and save it to IndexedDB using the helper function 
      data.meals.forEach((meal) => {
        idbPromise('meals', 'put', meal);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
      } else if (!loading) {
        // since we're offline, get all of the data from the `meals` store
        idbPromise('meals', 'get').then((meals) => {
          // use retrieved data to set global state for offline browsing
          dispatch({
            type: UPDATE_MEALS,
            meals: meals
          });
        });
      }
    }, [data, loading, dispatch]);
  
  function filterMeals() { 
      // if no category or the all category is selected
      if (!currentCategory || currentCategory ===  (state.categories.find( cat =>  cat.name === "All" ? currentCategory : false)._id)) {
        return state.meals;
      }
        // go through all meals and then through all categories in that meal to see if it matches the current category
      return state.meals.filter(meal =>  meal.category.find(id =>  id._id === currentCategory));
  }

  return (
    <div className="my-2">
      <h2>Select Your Meals:</h2>
      {state.meals.length ? (
        <div className="flex-row justify-content-center">
          {filterMeals().map((meal, index) => (
            <MealCard
              key={index}
              _id={meal._id}
              image={meal.image}
              name={meal.name}
              price={meal.price}
              ingredients={meal.ingredients}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any meals to the database yet!</h3>
      )}
      {loading ? <div className='flex-row justify-center'><img src={spinner} alt="loading" /></div> : null}
    </div>
  );
}

export default MealsList;
