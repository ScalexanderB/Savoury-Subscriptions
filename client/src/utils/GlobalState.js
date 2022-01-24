import React, { createContext, useContext } from "react";
import { useMealReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useMealReducer({
        //once API is functioning replace meals with an empty array 
        meals: [{
                name: "Tofu Pad Thai",
                image: "pad-thai.jpg",
                category: ["111", "222"],
                ingredients: ["tofu", "noodles", "green onion"],
                quantity: 150,
                price: 7.50
            },
            {
                name: "Macaroni & Cheese",
                image: "mac-cheese.jpg",
                category: ["111"],
                ingredients: ["cheese", "noodles", "milk", "butter"],
                quantity: 250,
                price: 5.75
            },
            {
                name: "Veggie Burger",
                image: "veggie-burger.jpg",
                category: ["111"],
                ingredients: ["veggie patty", "bun", "lettuce", "tomates", "pickles"],
                quantity: 200,
                price: 6.00
            },
            {
                name: "Shrimp Fried Rice",
                image: "fried-rice.jpg",
                category: ["222"],
                ingredients: ["shrimp", "rice", "onion", "bell peppers"],
                quantity: 300,
                price: 6.75
            },
            {
                name: "BBQ Chicken",
                image: "bbq-chicken.jpg",
                category: ["222"],
                ingredients: ["chicken", "spices", "potatoes", "carrots"],
                quantity: 275,
                price: 7.99
            },
            {
                name: "Stuffed Peppers",
                image: "stuffed-peppers.jpg",
                category: ["333"],
                ingredients: ["bell pepper", "beef", "onion", "cheese"],
                quantity: 250,
                price: 6.50
            },
            {
                name: "Frittata",
                image: "frittata.jpg",
                category: ["111", "333"],
                ingredients: ["eggs", "bell pepper", "onion", "carrots"],
                quantity: 175,
                price: 5.75
            },
            {
                name: "Taco Salad",
                image: "taco-salad.jpg",
                category: ["333"],
                ingredients: ["beef", "spices", "lettuce", "tomato", "dressing", "avocado"],
                quantity: 215,
                price: 7.25
            },
            {
                name: "Fish Tacos",
                image: "fish-tacos.jpg",
                category: ["000"],
                ingredients: ["fish", "tortillas", "coleslaw", "cheese"],
                quantity: 300,
                price: 8.15
            },
            {
                name: "Chicken Parm",
                image: "chicken-parm.jpg",
                category: ["000"],
                ingredients: ["chicken", "bread crumbs", "marinara", "cheese", "noodles"],
                quantity: 200,
                price: 6.50
            },
            {
                name: "Chile",
                image: "chile.jpg",
                category: ["222"],
                ingredients: ["beef", "carrots", "beans", "onion", "bell pepper", "spices"],
                quantity: 275,
                price: 7.15
            },
            {
                name: "Chicken Alfredo",
                image: "chicken-alfredo.jpg",
                category: ["000"],
                ingredients: ["chicken", "noodles", "milk", "cheese"],
                quantity: 300,
                price: 5.75
            }
        ],
        cart: [],
        cartOpen: false,
        //once API is functioning replace categories with an empty array 
        categories: [{ name: 'Vegetarian', _id: "111" },
            { name: 'Dairy Free', _id: "222" },
            { name: 'Gluten Free', _id: "333" },
            { name: 'None', _id: "000" }
        ],
        currentCategory: ''
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value = {
        [state, dispatch]
    } {...props }
    />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };