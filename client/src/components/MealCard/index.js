import React from "react";
import { Link } from "react-router-dom";

import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function MealCard(item) {
  const { _id, name, image, ingredients, price } = item;
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  
    // if there was a match, call UPDATE with a new purchase quantity
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
    <div className="card px-1 py-1">
      <Link to={`/meals/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
        <p>{ingredients}</p>
      </Link>
      <div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add To Box</button>
    </div>
  );
}

export default MealCard;
