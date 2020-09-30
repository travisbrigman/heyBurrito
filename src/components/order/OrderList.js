import React, { useContext, useEffect } from "react";
import { OrderContext } from "./OrderProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { FoodOrderItem } from "./FoodOrderItem";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { Box, Heading } from "grommet";

export const OrderList = (props) => {
  const { getOrders } = useContext(OrderContext);
  const { foodItems, getFoodItems } = useContext(FoodItemContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

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
    <Box>
    {/* <Heading level="3">Current Order</Heading> */}
    <Box className="orders">
      {foodItems.map((foodItemObject) => (
        <FoodOrderItem
          key={foodItemObject.id}
          foodItemObject={foodItemObject}
          foodDetails={foodDetails}
          ingredients={ingredients}
          foodItemIngredients={foodItemIngredients}
          {...props}
        />
      ))}
    </Box>
    </Box>
  );
};
