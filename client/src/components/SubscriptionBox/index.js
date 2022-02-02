import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import MealCard from "../MealCard";
import { REMOVE_SUBSCRIPTION } from "../../utils/mutations";

function SubscriptionBox({subscription, index}) {
  // to toggle editing os subscription
  const [editMode, setEditMode] = useState(0);
  const toggleEditSubscription = () =>  editMode ? setEditMode(0) : setEditMode(1);

  const [removeSubscription] = useMutation(REMOVE_SUBSCRIPTION);

  const deleteSubscription = async () =>{
    try {
      const mutationResponse = await removeSubscription({
        variables: { id: subscription._id },
      });
      console.log(mutationResponse);
    } 
    catch (e) {
      console.log(e);
    }
  }

  return (
  <div className="my-2 userSubscription">
  <div className='subscriptionHeader flex-row justify-space-between' style={{alignItems:"center" , backgroundColor:"lightgrey"}}>
  <span>
    <h3>
      Subsciption #{index+1} {new Date(parseInt(subscription.purchaseDate)).toLocaleDateString()}
    </h3>
  </span>
  <span>
 
    { editMode ?
    <>
        <button className="remove highlight" type="button" onClick={deleteSubscription}>Delete</button>
        <button className="checkout highlight" type="button">Save</button>
        <button className="loginToggle highlight" type="button" onClick={toggleEditSubscription}>Cancel</button>
    </>
        :
        <button className="loginToggle highlight" type="button" onClick={toggleEditSubscription}>
          Edit
        </button>
      }
  </span>
  </div>
    <section className="d-flex flex-wrap justify-center">
    {subscription.meals.map((meal, index) => (
      <MealCard
        key={index}
        _id={meal._id}
        image={meal.image}
        name={meal.name}
        price={meal.price}
        ingredients={meal.ingredients}
        category={meal.category}
        subscriptionMeal = {true}
        editable = {editMode}
      />
    ))}
    </section>
  </div>
  );
}

export default SubscriptionBox;
