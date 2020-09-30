import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "./OrderProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { FoodOrderItem } from "./FoodOrderItem";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { Box, Button, Heading } from "grommet";
import { CustomerContext } from "../customers/CustomerProvider";

export const OrderList = (props) => {
  const { addToOrder, getOrders } = useContext(OrderContext);
  const { foodItems, getFoodItems, patchFoodItem } = useContext(FoodItemContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);
  const {
    ingredients,
    getIngredients,
    foodItemIngredients,
    getFoodItemIngredients,
  } = useContext(IngredientContext);

  const{ getCustomers, signedInCustomer } = useContext(CustomerContext)

  const [ currentOrderList, setCurrentOrderList ] = useState([])

  
  const filteredFoodItems = foodItems.filter( item => item['orderId'] === undefined )
  useEffect(() => {
    setCurrentOrderList(filteredFoodItems)
    
  },[foodItems])

  useEffect(() => {
    getOrders();
    getFoodItems();
    getFoodDetails();
    getIngredients();
    getFoodItemIngredients();
    getCustomers()
  }, []);

  const sendOrder = () => {
    /*construct an object to post to the Orders collection. 
    Object will have the following properties:
    {
      id: int,
      userId: int,
      time: timestamp,
      completed: Boolean
    }
    - Post that object,
    - get the OrderId and patch the related FoodItems
    - clear the current list of order items
    - show a cool alert
    */
    var date = new Date();
    var time = date.getTime();

    addToOrder({
      userId: signedInCustomer.id,
      time,
      completed: false
    })
    .then((res) =>
        foodItems.forEach((item) =>
          patchFoodItem({
            id: item.id,
            orderId: res.id,
          })
        )
      )
    .then(getOrders())   
    .then(setCurrentOrderList(filteredFoodItems))
  }

  return (
    <Box>
    <Heading level="3">Current Order</Heading>
    <Box className="orders">
      {currentOrderList.map((foodItemObject) => (
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
    <Button
              primary={true}
              margin="small"
              pad="small"
              label="Send To Burrito Shop!"
              onClick={(evt) => {
                sendOrder();
              }}
              {...props}
            />
    </Box>
  );
};
