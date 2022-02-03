import React, { createContext, useContext } from "react";
import { useMealReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useMealReducer({
        meals: [],
        cart: [],
        categories: [],
        currentCategory: '',
        favs: [],
        editableSubscription: { meals: [] }
    });
    // use this to confirm it works!
    //console.log(state);
    return <Provider value = {
        [state, dispatch]
    } {...props }
    />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };