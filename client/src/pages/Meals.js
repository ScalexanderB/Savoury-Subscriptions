import React from "react";
import CategoryMenu from "../components/CategoryMenu"
import MealsList from "../components/MealsList";
import Cart from "../components/Cart";

const Meals = () => {

  return (
    <div className="container">
      <CategoryMenu />
      <MealsList />
      <Cart />
    </div>
  );
};

export default Meals;
