import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import MealCard from "../MealCard";
import { REMOVE_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from "../../utils/mutations";
import { UPDATE_EDITABLE_SUBSCRIPTION, SET_REPLACE_MEAL } from "../../utils/actions";
import { useStoreContext } from '../../utils/GlobalState';

const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

function SubscriptionBox({subscription, index }) {
  const [state , dispatch] = useStoreContext();
  const [removeSubscription] = useMutation(REMOVE_SUBSCRIPTION);
  const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION);
  // to toggle editing os subscription
  const [editMode, setEditMode] = useState(0);
  const toggleEditSubscription = () =>  editMode ? clearEditMode() : setUpForEdit();

  // all this effect does is initialize the tool tip on add to subscription button
  useEffect(()=>{
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    tooltipTriggerList.forEach( tooltipElement =>new bootstrap.Tooltip(tooltipElement,{ trigger : 'hover' })); 
  });

  const setUpForEdit = () =>{
    // set the editableSubscription in state to the currentSubscription
    dispatch({ type: UPDATE_EDITABLE_SUBSCRIPTION, sub:{...subscription } });
    setEditMode(1);
  };

  const clearEditMode = () =>{
    // set the editableSubscription in state to an empty object
    setEditMode(0);
    dispatch({ type: UPDATE_EDITABLE_SUBSCRIPTION, sub:{ } });
    
  };

  const addMealToSubscription = () =>{
    //clear current replace meal settings in state
    dispatch({ type: SET_REPLACE_MEAL, sub:{id:'',meal:''} });
  };

  const getSubscriptionTotalPrice = type =>{
      let sum = 0;
      
      switch(type){
        case "db" :
          subscription.meals.forEach(item => {
            sum += item.price * item.quantity;
          });
          break;

        //case "state" :
        
        default :
          state.editableSubscription.meals.forEach(item => {
            sum += item.price * item.quantity;
          });
      }

      return sum.toFixed(2);
  };
  
  const deleteSubscription = async () =>{
    if(window.confirm("Are you sure you want to delete your subscription?")){
      try {
        const mutationResponse = await removeSubscription({
          variables: { id: subscription._id },
        });
       // console.log(mutationResponse);
        // update state so subscriptions rerender
        // this is accompished through appolo InMemoryCache custom merge function
        // and a useEfect hook in the meal card to update the quantities on rerender
      } 
      catch (e) {
        console.log(e);
      }
    }
  };

  const useUpdateSubscriptionMutation = async () =>{

    const meals = state.editableSubscription.meals.map(meal => {
      return {
        cartId: meal._id,
        name: meal.name,
        image: meal.image,
        ingredients: meal.ingredients,
        category: [],
        quantity: parseInt(meal.quantity),
        price: parseFloat(meal.price)
      }
    });

      // this will call a mutation to update the subscription of the logged in user
      try {
        const mutationResponse = await updateSubscription({
          variables: { id: subscription._id , meals},
        });
        console.log(mutationResponse);
        clearEditMode();
        
        //window.location="/myprofile";
      } 
      catch (e) {
        console.log(e);
      }
  };

  return (
  <div className="my-2 userSubscription">
  <div className='subscriptionHeader flex-row flex-wrap px-2' style={{alignItems:"center", backgroundColor:"lightgrey"}}>
    <h3>Subscription #{index+1} </h3> 
    
  <div className='flex-row justify-space-between flex-nowrap' style={{alignItems:"center", flex:"1 1"}}>
    <span style={{marginLeft:"2rem"}}>started: {new Date(parseInt(subscription.purchaseDate)).toLocaleDateString()}</span>
    <span>
      { editMode ?
      <>
          <button className="remove highlight" type="button" onClick={deleteSubscription}>Delete</button>
          <button className="checkout highlight" type="button" onClick={useUpdateSubscriptionMutation}>Save</button>
          <button className="loginToggle highlight" type="button" onClick={toggleEditSubscription}>Cancel</button>
      </>
          :
          state.editableSubscription?._id || 0 ? 
              // if already editing another subscription disable the edit button
            <button className="loginToggle highlight" type="button" disabled={true} >Edit</button>
            : 
            <button className="loginToggle highlight" type="button" onClick={toggleEditSubscription}>Edit</button>   
        }
     </span>
  </div>
  </div>
    { editMode ?
        <div className="d-flex justify-flex-end px-3 py-1" style={{width:"100%", gap:"1.2rem"}}>
          <span>
            Old Cost: ${getSubscriptionTotalPrice("db")}
          </span>
          <span>
            New Cost: ${getSubscriptionTotalPrice("state")}
          </span>
          <button className="checkout highlight" type="button" 
            data-bs-toggle="offcanvas" data-bs-target="#slideInMenu" aria-controls="slideInMenu"
            data-toggle="tooltip" data-bs-placement="bottom" title="Add new meal"
            style={{fontSize:".8rem",padding:".2rem .25rem .1rem"}}
            onClick={addMealToSubscription}>  
              <span role="img" aria-label="plus-sign" style={{color: "transparent",textShadow:"0 0 0 white"}}>➕</span>
          </button>
        </div>
        :
        <></>
    }
    <section className="d-flex flex-wrap justify-center">
    { subscription._id === state?.editableSubscription?._id || null ?
    //render meals from state
     state.editableSubscription.meals.map((meal, index) => (
      <MealCard
        key={index}
        _id={meal._id}
        image={meal.image}
        name={meal.name}
        price={meal.price}
        quantity={meal.quantity}
        ingredients={meal.ingredients}
        category={meal.category}
        subscriptionMeal = {subscription._id}
        editable = {editMode}
      />
    ))
    :
    // render meals from subscription
    subscription.meals.map((meal, index) => (
      <MealCard
        key={index}
        _id={meal._id}
        image={meal.image}
        name={meal.name}
        price={meal.price}
        quantity={meal.quantity}
        ingredients={meal.ingredients}
        category={meal.category}
        subscriptionMeal = {subscription._id}
        editable = {editMode}
      />
    ))
    }
    </section>
  </div>
  );
}

export default SubscriptionBox;
