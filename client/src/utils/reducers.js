import { useReducer } from 'react';

import {
    UPDATE_MEALS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    ADD_TO_FAVS,
    REMOVE_FROM_FAVS,
    UPDATE_FAVS,
    SET_REPLACE_MEAL,
    UPDATE_EDITABLE_SUBSCRIPTION
} from './actions';

export const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        // if action type value is the value of `ADD_TO_FAVS`, return a new state object with an updated favs array
        case ADD_TO_FAVS:
            if (!state.favs.find(id => id === action.id))
                return {
                    ...state,
                    favs: [...state.favs, action.id]
                };
            else return {...state };
            // if action type value is the value of `REMOVE_FROM_FAVS`, return a new state object with an updated favs array
        case REMOVE_FROM_FAVS:
            newState = state.favs.filter(meal => {
                return meal !== action.id;
            });
            return {
                ...state,
                favs: newState
            };
            // if action type value is the value of `UPDATE_FAVS`, return a new state object with an updated favs array
        case UPDATE_FAVS:
            return {
                ...state,
                favs: [...action.favs]
            };
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
                cart: [...state.cart, action.meal]
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.meals],
            };

        case REMOVE_FROM_CART:
            newState = state.cart.filter(meal => {
                return meal._id !== action._id;
            });

            return {
                ...state,
                cart: newState
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
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
                cart: []
            };
        case SET_REPLACE_MEAL:
            return {
                ...state,
                currentMeal: action.sub.meal
            }
        case UPDATE_EDITABLE_SUBSCRIPTION:
            return {
                ...state,
                editableSubscription: {...action.sub }
            }

        default:
            return state;
    }
};

export function useMealReducer(initialState) {
    return useReducer(reducer, initialState);
}