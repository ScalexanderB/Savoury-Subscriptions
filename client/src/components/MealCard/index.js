import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { ADD_FAV_MEAL , REMOVE_FAV_MEAL} from "../../utils/mutations";
import { ADD_TO_FAVS, REMOVE_FROM_FAVS, SET_REPLACE_MEAL, UPDATE_EDITABLE_SUBSCRIPTION } from "../../utils/actions"
import { useMutation } from '@apollo/client';

import "./style.css";

function MealCard(item) {
  const { name, image, ingredients, price, subscriptionMeal, editable } = item;
  const [state , dispatch] = useStoreContext();
  const [addFav] = useMutation(ADD_FAV_MEAL);
  const [removeFav] = useMutation(REMOVE_FAV_MEAL);
  
  const startingQuantity  = parseInt(item.quantity) || 1;
  
  // for quantity of servings
  const [qty, setQty] = useState(startingQuantity);
  // for added message flash alert
  const [added, setAdded] = useState(0);
  
  useEffect(()=>{
    let startingQuantity  = parseInt(item.quantity) || 1;
    setQty(startingQuantity);
  },[setQty, item])
  
  const onChange = (e) => {
    
    let value = e.target.value;
    if(parseInt(value) < 1) {value=1;}
    
    if(editable){
           // update editableSubscription meals array and not the local state ie. qty
           const newMealsState = state.editableSubscription.meals.map(meal =>{
            if(meal._id === item._id) return { ...item, quantity: parseInt(value) };
            return meal;
          });
          
          // update state with new data
          dispatch({ type: UPDATE_EDITABLE_SUBSCRIPTION, sub:{ ...state.editableSubscription , meals:newMealsState} });
    }
    else{ setQty(value); }
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  const toggleFavMeal = async () =>{
    if(!isFav()){
      try {
        const mutationResponse = await addFav({
          variables: { id: item._id },
        });
        //console.log(mutationResponse);
        if(mutationResponse){
          dispatch({
            type: ADD_TO_FAVS,
            id: item._id
          });
      }
      } catch (e) {
        console.log(e);
      }
    }
    else{
      try {
        const mutationResponse = await removeFav({
          variables: { id: item._id },
        });
        //console.log(mutationResponse);
        if(mutationResponse){
          dispatch({
            type: REMOVE_FROM_FAVS,
            id: item._id
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const setUpForReplacement = () =>{
    // set the currentSubscription and the currentMeal in state
    dispatch({ type: SET_REPLACE_MEAL, sub:{id:subscriptionMeal,meal:item._id} });
  };

  const replaceMealInSubscription = () =>{
    //this should update a state subscription for eventual mutaion use.
      // update editableSubscription meals array into newMealsState
      const newMealsState = state.editableSubscription.meals.map(meal =>{
        if(meal._id === state.currentMeal) return { ...item, quantity: qty };
        return meal;
      });
      // update state with new data
      dispatch({ type: UPDATE_EDITABLE_SUBSCRIPTION, sub:{ ...state.editableSubscription , meals:newMealsState} });
      //clear current replace meal settings in state
      dispatch({ type: SET_REPLACE_MEAL, sub:{id:'',meal:''} });
      //reset quantity in mealCard
      setQty(1);
      //close the menu
      document.getElementById("closeSlideInMenu").click();
  }

  const removeFromSubscription = () =>{
    // all subscriptionupdates should be done in state until save is clicked
    // update editableSubscription meals array into newMealsState
    const newMealsState = state.editableSubscription.meals.filter(meal => meal._id !== item._id);
    // update state with new data
    dispatch({ type: UPDATE_EDITABLE_SUBSCRIPTION, sub:{ ...state.editableSubscription , meals:newMealsState} });
  };

  const addToSubscription = () =>{
    // all subscriptionupdates should be done in state until save is clicked
    // update editableSubscription meals array into newMealsState that includes item
    const newMealsState = [...state.editableSubscription.meals, { ...item, quantity: qty }]
    // update state with new data
    dispatch({ type: UPDATE_EDITABLE_SUBSCRIPTION, sub:{ ...state.editableSubscription , meals:newMealsState} });
    //reset quantity in mealCard
    setQty(1);
    //close the menu
    document.getElementById("closeSlideInMenu").click();
  };
  
  const isFav = ()=> state.favs.find(id=>id === item._id); 
  const favClasses = () => isFav() ? "favmeal selected" : "favmeal" ;  

  const addToCart = () => {
    /// this should add a new meal package with its own servings quantity
    /// wether or not the meal already is present in the cart
  
    // flash an added to cart message then reset the mealcard after a timeout
       setAdded(1);
       setTimeout(() => {
        setAdded(0);
        setQty(1);
       }, 950);
      //add to state
      dispatch({
        type: ADD_TO_CART,
        meal: { ...item, quantity: qty }
      });
      //add to idb cache
      idbPromise('cart', 'put', { ...item, quantity: qty, _id: Date.now() });
  };

  return (
    <div className="card p-2" style={{border:"1px soild black"}}>
       <div className={`addedMessage ${added ? "isAdded" : ""}`}>
        <h3>
          Meal Added to <br/>Subscription!
          <div role="img" aria-label="Successfuly added">
            ✅ 
          </div>
        </h3>
      </div>
        <div className="d-flex" style={{justifyContent:"space-between"}}>
          <h3>{name}</h3>
          {
          Auth.loggedIn() && !subscriptionMeal ?
          <img className={favClasses()} aria-label="favourite" onClick={toggleFavMeal} style={{cursor:"pointer"}} />
            :
            <></>
          }         
        
        </div>
        <div className="d-flex" style={{textAlign:"left", justifyContent:"center"}}>
            <img style={{alignSelf:"flex-start"}}
            alt={name}
            src={`/images/${image}`}
            className="mx-2"
            />
            <span style={{width:"60%"}}>
                <strong>Ingredients:</strong>
              <ul className="d-flex flex-column flex-wrap" style={{ height:"6rem", paddingLeft:0}}>
                {ingredients.map((item) => (
                    <li key={item}>{item}</li>
                ))}
              </ul>
            </span>
        </div>
      <div className="d-flex mealCost">
        <span style={{paddingLeft:"2rem"}}>Servings:&nbsp;
        
          {!subscriptionMeal ?  
            <input className='mealCard-servingsInput' 
              type="number"
              placeholder="1"
              value={qty}
              onChange={onChange}  
            />
           :
           editable ?
               <input className='mealCard-servingsInput' 
                type="number"
                placeholder="1"
                value={item.quantity}
                onChange={onChange}  
              />
            :
              <span>{qty}</span>
          }
        </span>
        {editable ? 
          <span style={{paddingRight:"2rem"}}><h5 style={{display:"inline"}}>Price: ${financial(price*item.quantity)}</h5> </span>
        :
          <span style={{paddingRight:"2rem"}}><h5 style={{display:"inline"}}>Price: ${financial(price*qty)}</h5> </span>
        }
        
      </div>
      { subscriptionMeal ?
          editable ?
        <span id='meal-edit-buttons'>
          <button className='loginToggle highlight' type="button" data-bs-toggle="offcanvas" data-bs-target="#slideInMenu" aria-controls="slideInMenu"
          onClick={setUpForReplacement} >Replace</button>
          <button className='remove highlight' onClick={removeFromSubscription}>Remove</button>
        </span>
        :
        <></>
        :
          state.editableSubscription?._id || 0 ?
            state.currentMeal === '' ?
            <button className='add highlight' onClick={addToSubscription}>Add to Subscription</button>
            :
            <button className='add highlight' onClick={replaceMealInSubscription}>Replace</button>
          :
        <button className='add highlight' onClick={addToCart}>Add To Box</button>
      }
    </div>
  );
}

export default MealCard;
