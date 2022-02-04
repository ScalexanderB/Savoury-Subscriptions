import React from "react";

const NoMatch = () => {
  return (
    <div className="d-flex flex-column justify-center" style={{textAlign:"center"}}> 
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Male Chef Emoji" style={{fontSize:"6rem"}}>
             👨‍🍳
          </span>
        </h1>
    </div>
  );
};

export default NoMatch;
