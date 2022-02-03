import React from 'react';

import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
  
    if (parseInt(value) <= 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        quantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, quantity: parseInt(value) });
    }
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  return (
    <div className="card p-2 SubBox">
        <div className="d-flex" style={{justifyContent:"flex-start"}}>
          <h4>{item.name}</h4>
        </div>
        <div className="d-flex" style={{textAlign:"left", justifyContent:"space-between", marginBottom:".3rem"}}>

            <img style={{alignSelf:"flex-start"}}
            alt={item.name}
            src={`/images/${item.image}`}
            className="mx-2"
            />

            <div className="d-flex flex-column" style={{justifyContent:"space-between", paddingBottom:".6rem"}}>
              <span>Servings:&nbsp;
                <input style={{width:"2.1rem", padding:0, paddingLeft:".2rem"}}
                  type="number"
                  placeholder="1"
                  value={item.quantity}
                  onChange={onChange}
                />
              </span>
              <span><h5 style={{display:"inline"}}>Price: ${financial(item.price*item.quantity)}</h5> </span>
            </div>
        </div>

      <button className='remove highlight' onClick={() => removeFromCart(item)}>Remove</button>
    </div>
  );
}



export default CartItem;