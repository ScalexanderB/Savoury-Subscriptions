import React, { useState } from "react";
import MealCard from "../MealCard";

function SubscriptionBox({subscription, index}) {
  // to toggle editing os subscription
  const [editMode, setEditMode] = useState(0);
  const toggleEditSubscription = () =>  editMode ? setEditMode(0) : setEditMode(1);



  return (<div key={subscription._id} className="my-2 userSubscription">
  <div className='subscriptionHeader flex-row justify-space-between' style={{alignItems:"center" , backgroundColor:"var(--bs-grey-900)"}}>
  <span>
    <h3>
      Subsciption #{index+1} {new Date(parseInt(subscription.purchaseDate)).toLocaleDateString()}
    </h3>
  </span>
  <span>
    <button className="loginToggle highlight" type="button" onClick={toggleEditSubscription}>
      Edit
    </button>
    <button className="remove highlight" type="button">
      Delete
    </button>
  </span>
  </div>
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

  </div>
  );
}

export default SubscriptionBox;
