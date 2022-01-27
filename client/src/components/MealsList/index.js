import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MEALS } from '../../utils/actions';

import MealCard from '../MealCard';
import { QUERY_MEALS } from '../../utils/queries';


import { idbPromise } from "../../utils/helpers";

const spinner ="https://giphy.com/stickers/happy-excited-morning-5BBYkpgeVVuZW";

function MealsList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;
  
  let { loading, data } = useQuery(QUERY_MEALS);
  
  useEffect(() => {
    // add hardcoded meals data from state for testing
    data = {meals: state.meals}
    /*********************** */
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
  
  function filterMeals() {  /// 111 is the 'None' Category
    if (!currentCategory || currentCategory == '111') {
      return state.meals;
    }
  
    return state.meals.filter(meal => meal.category.find( id =>  id === currentCategory ));
  }
  
  return (
    <div className="my-2">
      <h2>Select Your Meals:</h2>
      {state.meals.length ? (
        <div className="flex-row">
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
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default MealsList;
