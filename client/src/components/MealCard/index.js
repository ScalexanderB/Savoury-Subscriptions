import React, { useState } from "react";

import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function MealCard(item) {
  const { name, image, ingredients, price, _id } = item;
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const [qty, setQty] = useState(1);

  const onChange = (e) => {
    let value = e.target.value;
    // need a simple counter in the state for each meal card to adjust the servings quantity
    if(parseInt(value) < 1) value=1;
    setQty(value);
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  const addToCart = () => {
    // find the cart item with the matching id
    //const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  
    // if there was a match, call UPDATE with a new purchase quantity
    /// BUT this should add a new meal package with its own servings quantity
    /*
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        quantity: parseInt(itemInCart.quantity) + 1
      }); idbPromise('cart', 'put', {
        ...itemInCart,
        quantity: parseInt(itemInCart.quantity) + 1
      });
    } else {
        */
       console.log(item);
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, quantity: qty }
      });
      idbPromise('cart', 'put', { ...item, quantity: qty });
   // }
  };

  return (
    <div className="card p-2" style={{border:"1px soild black"}}>
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
      <div className="d-flex" style={{justifyContent:"space-between", paddingBottom:".6rem"}}>
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
