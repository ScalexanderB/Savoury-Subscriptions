import React from "react";

const Expired = () => {
  return (
    <div className="d-flex flex-column justify-center" style={{textAlign:"center"}}> 
        <h1>Your Session Has Expired</h1>
        <h1>
          <img src="https://www.svgrepo.com/show/356803/expired.svg" style={{width:"15rem",height:"15rem"}}/>
        </h1>
        <h3>Please Login Again...</h3>
        <p>&nbsp;</p>
    </div>
  );
};

export default Expired;
