import React, { useState } from "react";

//    The context is imported and used by individual components that need data

export const IngredientContext = React.createContext();

// This component establishes what data can be used.

export const IngredientProvider = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const [foodItemIngredients, setFoodItemIngredients] = useState([]);

  const getIngredients = () => {
    return fetch("http://localhost:8088/ingredients?_expand=ingredientCategory")
      .then((res) => res.json())
      .then(setIngredients);
  };
  const getFoodItemIngredients = () => {
    return fetch("http://localhost:8088/foodItemIngredients?_expand=ingredient")
      .then((res) => res.json())
      .then(setFoodItemIngredients);
  };
  
  return (
    <IngredientContext.Provider
    value={{
      ingredients,
      getIngredients,
      foodItemIngredients,
      getFoodItemIngredients
    }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};
