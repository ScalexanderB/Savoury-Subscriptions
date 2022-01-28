import { useReducer } from 'react';

import {
    UPDATE_MEALS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_MEALS`, return a new state object with an updated meals array
        case UPDATE_MEALS:
            return {
                ...state,
                meals: [...action.meals]
            };
            // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
            // if action type value is the value of `UPDATE_CURRENT_CATEGORY`, return a new state object with an updated currentCategory value
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.meal]
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.meals],
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(meal => {
                return meal._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(meal => {
                    if (action._id === meal._id) {
                        meal.quantity = action.quantity;
                    }
                    return meal;
                })
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        default:
            return state;
    }
};

export function useMealReducer(initialState) {
    return useReducer(reducer, initialState);
}