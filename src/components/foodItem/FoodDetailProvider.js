import React, { useState } from "react";

//    The context is imported and used by individual components that need data

export const FoodDetailContext = React.createContext();

// This component establishes what data can be used.

export const FoodDetailProvider = (props) => {
  const [foodDetails, setFoodDetails] = useState([{name:""}]);
  //http://db-hey-burrito.heroku.com
  //http://localhost:8088/foodDetails
  const getFoodDetails = () => {
    return fetch("http://db-hey-burrito.heroku.com/foodDetails")
      .then((res) => res.json())
      .then(setFoodDetails);
  };
  
  return (
    <FoodDetailContext.Provider
    value={{
      foodDetails,
      getFoodDetails,
    }}
    >
      {props.children}
    </FoodDetailContext.Provider>
  );
};
