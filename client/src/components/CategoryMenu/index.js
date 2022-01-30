import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {

  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  let { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
  <div className="categoryScrollBox">
      {categories.map(item => 
        item._id == state.currentCategory ? 
           (<button 
              className="category selected"        
              key={item._id}
              onClick={() => { handleClick(item._id); }} >
            {item.name}
            </button>
          )
          :
          (<button 
              className="category"        
              key={item._id}
              onClick={() => { handleClick(item._id); }} >
            {item.name}
            </button>
          ) 
      )}
  </div>
  );
}

export default CategoryMenu;
