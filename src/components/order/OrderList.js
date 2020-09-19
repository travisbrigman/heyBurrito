import React, { useContext, useEffect } from "react";
import { OrderContext } from "./OrderProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { FoodOrderItem } from "./FoodOrderItem";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";

export const OrderList = (props) => {
  const { orders, getOrders } = useContext(OrderContext);
  const { foodItems, getFoodItems } = useContext(FoodItemContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);
  const { deleteOrder } = useContext(OrderContext);
  const {
    ingredients,
    getIngredients,
    foodItemIngredients,
    getFoodItemIngredients,
  } = useContext(IngredientContext);

  useEffect(() => {
    getOrders();
    getFoodItems();
    getFoodDetails();
    getIngredients();
    getFoodItemIngredients();
  }, []);

  return (
    <div className="orders">
      {foodItems.map((foodItemObject) => (
        <FoodOrderItem
          key={foodItemObject.id}
          foodItemObject={foodItemObject}
          deleteOrder={deleteOrder}
          foodDetails={foodDetails}
          ingredients={ingredients}
          foodItemIngredients={foodItemIngredients}
          {...props}
        />
      ))}
    </div>
  );
};
