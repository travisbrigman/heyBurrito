import React, { useContext, useRef, useEffect, useState } from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";

export const BurritoItemOrderForm = (props) => {

    const {
        foodItems,
        getFoodItems,
        foodItemIngredients,
        getFoodItemIngredients,
        addToFoodItems,
        addToFoodItemIngredients,
        updateFoodItem,
        deleteFoodOrderItemIngredient,
      } = useContext(FoodItemContext);
      const { ingredients, getIngredients } = useContext(IngredientContext);
      const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);



useEffect(() => {
    getFoodItems()
    getFoodItemIngredients()
    getIngredients()
    getFoodDetails()
},[])

const [menuDetails, setMenuDetails] = useState([])

useEffect(() => {
    setMenuDetails(foodDetails)
},[foodDetails])

console.log(foodItems)
console.log(foodDetails)
console.log(menuDetails)

return(<>
{/* <div>{foodDetails[0].name}</div> */}
{foodItems.map(item => (<div>{item.quantity}</div>))}
</>)

}