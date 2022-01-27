import React from "react";
import CategoryMenu from "../components/CategoryMenu"
import MealsList from "../components/MealsList";
import NewCart from "../components/newCart";

const Meals = () => {

  return (
    <div className="container">
      <CategoryMenu />
      <MealsList />
      <NewCart />
    </div>
  );
};

export default Meals;
