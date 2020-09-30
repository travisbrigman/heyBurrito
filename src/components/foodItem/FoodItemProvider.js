import React, { useState } from "react";

//    The context is imported and used by individual components that need data

export const FoodItemContext = React.createContext();

// This component establishes what data can be used.

export const FoodItemProvider = (props) => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemIngredients, setFoodItemIngredients] = useState([]);
  //const [postResponse, setPostResponse] = useState({});
  //console.log(postResponse)

  const getFoodItems = () => {
    return fetch("http://localhost:8088/foodItems?_embed=foodItemIngredients")
      .then((res) => res.json())
      .then(setFoodItems);
  };

  const getFoodItemIngredients = () => {
    return fetch("http://localhost:8088/foodItemIngredients?_expand=ingredient")
      .then((res) => res.json())
      .then(setFoodItemIngredients);
  };

  const addToFoodItems = (foodItemObject) => {
    return fetch("http://localhost:8088/foodItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItemObject),
    }).then(res => res.json())
};

  const patchFoodItem = (foodItemObject) => {
    return fetch(`http://localhost:8088/foodItems/${foodItemObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItemObject),
    }).then(res => res.json())
};

  const addToFoodItemIngredients = (foodItemIngredientObject) => {
    return fetch("http://localhost:8088/foodItemIngredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItemIngredientObject),
      
    })//.then(getFoodItems);
  };

  const deleteFoodOrderItemIngredient = (FoodOrderItemId) => {
    return fetch(`http://localhost:8088/foodItems/${FoodOrderItemId}`, {
      method: "DELETE",
    })
  };
  const deleteFoodOrderItem = (FoodOrderItemId) => {
    return fetch(`http://localhost:8088/foodItems/${FoodOrderItemId}`, {
      method: "DELETE",
    }).then(getFoodItems);
  };
  
  // const deleteFoodItemIngredient = (itemIngredientId) => {
  //   return fetch(`http://localhost:8088/foodItems/${itemIngredientId}`, {
  //     method: "DELETE",
  //   }).then(getFoodItemIngredients);
  // };
  
  const updateFoodItem = (foodItem) => {
    return fetch(`http://localhost:8088/foodItems/${foodItem.id}`, {
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
      patchFoodItem
    }}
    >
      {props.children}
    </FoodItemContext.Provider>
  );
};