import React, { useState } from "react";

import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function MealCard(item) {
  const { name, image, ingredients, price } = item;
  const [, dispatch] = useStoreContext();
  //const { cart } = state;

  // for quantity of servings
  const [qty, setQty] = useState(1);
  // for added message flash alert
  const [added, setAdded] = useState(0);

  const onChange = (e) => {
    let value = e.target.value;
    if(parseInt(value) < 1) {value=1;}
    setQty(value);
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  const addToCart = () => {
    /// this should add a new meal package with its own servings quantity
    /// wether or not the meal already is present in the cart
       //console.log(item);

    // flash and added to cart message then reset the mealcard after a timeout
       setAdded(1);
       setTimeout(() => {
        setAdded(0);
        setQty(1);
       }, 950);

      dispatch({
        type: ADD_TO_CART,
        meal: { ...item, quantity: qty }
      });
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
          <span role="img" aria-label="favourite">
            ⭐
          </span>
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
          <input style={{width:"2.1rem", padding:0, paddingLeft:".2rem"}}
            type="number"
            placeholder="1"
            value={qty}
            onChange={onChange}
          />
        </span>
        <span style={{paddingRight:"2rem"}}><h5 style={{display:"inline"}}>Price: ${financial(price*qty)}</h5> </span>
      </div>
      <button onClick={addToCart}>Add To Box</button>
    </div>
  );
}

export default MealCard;
