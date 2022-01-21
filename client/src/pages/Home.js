import React from "react";
import CategoryMenu from "../components/CategoryMenu"
import MealsList from "../components/MealsList";
import Cart from "../components/Cart";

const Home = () => {

  return (
    <div className="container">
      <CategoryMenu />
      <MealsList />
      <Cart />
    </div>
  );
};

export default Home;
