import React from "react";
import MealsList from "../MealsList";
import CategoryMenu from "../CategoryMenu"

const MenuSlideIn = () => { 
  return (
<div className="offcanvas offcanvas-bottom" data-bs-scroll="true" tabIndex="-1" id="slideInMenu" aria-labelledby="slideInMenuLabel" style={{height:"69%"}}>
  <div className="offcanvas-header" style={{flexWrap:'wrap'}}>
    <h4 className="offcanvas-title" id="slideInMenuLabel" style={{flex:"0 1 94%"}}>Choose your Meal</h4>  
    <button type="button" id="closeSlideInMenu" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" style={{flex:"0 0 2rem"}}></button>
    <CategoryMenu />
  </div>
  <div className="offcanvas-body">
    <MealsList noTitle={true} />
  </div>
</div>

  );
};

export default MenuSlideIn;