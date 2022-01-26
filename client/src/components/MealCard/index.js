import React from "react";

import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function MealCard(item) {
  const { _id, name, image, ingredients, price } = item;
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const quantity = 1;
  const onChange = (e) => {
    const value = e.target.value;
    // need a simple counter in the state for each meal card to adjust the servings quantity
  };

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  
    // if there was a match, call UPDATE with a new purchase quantity
    /// BUT this should add a new meal package with its own servings quantity
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
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, quantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, quantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1" style={{border:"1px soild black"}}>
        <h3>{name}</h3>
        <span role="img" aria-label="favourite">
        ⭐
        </span>

        <div>
            <img
            alt={name}
            src={`/images/${image}`}
            className="mx-2"
            />
            <span>Ingredients:<br/>{ingredients}</span>
        </div>
      <div>
      <span>Qty:</span>
          <input style={{width:"2.5rem"}}
            type="number"
            placeholder="1"
            value={quantity}
            onChange={onChange}
          />
        <span>Price: ${price}</span>
      </div>
      <button onClick={addToCart}>Add To Box</button>
    </div>
  );
}

export default MealCard;
