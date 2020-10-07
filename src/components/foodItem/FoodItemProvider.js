import React, { useState } from "react";

//    The context is imported and used by individual components that need data

export const FoodItemContext = React.createContext();

// This component establishes what data can be used.

export const FoodItemProvider = (props) => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemIngredients, setFoodItemIngredients] = useState([]);
  //http://db-hey-burrito.heroku.com/customers

  //http://localhost:8088/foodItems?_embed=foodItemIngredients
  const getFoodItems = () => {
    return fetch("https://db-hey-burrito.herokuapp.com/foodItems?_embed=foodItemIngredients")
      .then((res) => res.json())
      .then(setFoodItems);
  };
//http://localhost:8088/foodItemIngredients?_expand=ingredient
  const getFoodItemIngredients = () => {
    return fetch("https://db-hey-burrito.herokuapp.com/foodItemIngredients?_expand=ingredient")
      .then((res) => res.json())
      .then(setFoodItemIngredients);
  };
//http://localhost:8088/foodItems
  const addToFoodItems = (foodItemObject) => {
    return fetch("https://db-hey-burrito.herokuapp.com/foodItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItemObject),
    }).then((res) => res.json());
  };
//http://localhost:8088/foodItems/${foodItemObject.id}
  const patchFoodItem = (foodItemObject) => {
    return fetch(`https://db-hey-burrito.herokuapp.com/foodItems/${foodItemObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItemObject),
    })
      .then((res) => res.json())
      .then(getFoodItems);
  };
//http://localhost:8088/foodItemIngredients
  const addToFoodItemIngredients = (foodItemIngredientObject) => {
    return fetch("https://db-hey-burrito.herokuapp.com/foodItemIngredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItemIngredientObject),
    }); //.then(getFoodItems);
  };
//http://localhost:8088/foodItems/${FoodOrderItemId}
  const deleteFoodOrderItemIngredient = (ingredientId) => {
    return fetch(`https://db-hey-burrito.herokuapp.com/foodItemIngredients/${ingredientId}`, {
      method: "DELETE",
    });
  };
  //http://localhost:8088/foodItems/${FoodOrderItemId}
  const deleteFoodOrderItem = (FoodOrderItemId) => {
    return fetch(`https://db-hey-burrito.herokuapp.com/foodItems/${FoodOrderItemId}`, {
      method: "DELETE",
    }).then(getFoodItems);
  };


//http://localhost:8088/foodItems/${foodItem.id}
  const updateFoodItem = (foodItemId,foodItem) => {
    return fetch(`https://db-hey-burrito.herokuapp.com/foodItems/${foodItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItem),
    }).then(getFoodItems);
  };

  return (
    <FoodItemContext.Provider
      value={{
        foodItems,
        getFoodItems,
        foodItemIngredients,
        getFoodItemIngredients,
        addToFoodItems,
        addToFoodItemIngredients,
        deleteFoodOrderItem,
        deleteFoodOrderItemIngredient,
        updateFoodItem,
        patchFoodItem,
      }}
    >
      {props.children}
    </FoodItemContext.Provider>
  );
};
