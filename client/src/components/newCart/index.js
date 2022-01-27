import React, { useEffect } from "react";
import CartItem from '../newCartItem';
import Auth from '../../utils/auth';
import './style.css';

import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const NewCart = () => {

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [state, dispatch] = useStoreContext();
  
  // for checkout session success
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  
  // for cart items
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, meals: [...cart] });
    };

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);
  

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.quantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const mealIds = [];
    const mealQtys = [];
  
    state.cart.forEach((item) => {
      //console.log(item);
      //for (let i = 0; i < item.quantity; i++) {
        mealIds.push(item._id);
        mealQtys.push(item.quantity);
     //}
    });
    
    getCheckout({
      variables: { meals: mealIds, qtys: mealQtys }
    });
  }

  return (
<>
<div className="cart-closed" onClick={toggleCart}>
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#popUpShoppingCart" aria-controls="popUpShoppingCart">View your cart</button>
</div>

<div className="offcanvas offcanvas-bottom show" data-bs-scroll="true" tabIndex="-1" id="popUpShoppingCart" aria-labelledby="popUpShoppingCartLabel" style={{height:"60%"}}>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="popUpShoppingCartLabel">This will be a shopping cart</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  {state.cart.length ? (
    <div>
      {state.cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
      <div className="flex-row space-between">
        <strong>Total: ${calculateTotal()}</strong>
        {
          Auth.loggedIn() ?
          <button onClick={submitCheckout}>
            Checkout
          </button>
            :
            <span>(log in to check out)</span>
        }
      </div>
    </div>
  ) : (
    <h4 style={{textAlign: 'center'}}>
      <div>
      <span role="img" aria-label="pensive">
      😔
      </span>
      </div>
      You haven't added any tasty meals to your box yet!
      <div>
      <span role="img" aria-label="NO!">
      🚫
      </span>
      <span role="img" aria-label="fried-prawn">
      🍤
      </span>
      <span role="img" aria-label="package">
      📦
      </span>
      </div>
   
    </h4>
  )}
  </div>
</div>

</>

  );
};

export default NewCart;