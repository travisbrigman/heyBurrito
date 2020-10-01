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
  const { foodItems, getFoodItems, patchFoodItem } = useContext(
    FoodItemContext
  );
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);
  const { getCustomers, signedInCustomer } = useContext(CustomerContext);
  const {
    ingredients,
    getIngredients,
    foodItemIngredients,
    getFoodItemIngredients,
  } = useContext(IngredientContext);

  //sets the state of the list of items to be rendered
  const [currentOrderList, setCurrentOrderList] = useState([]);
  console.log(currentOrderList);

  //finds items in foodItem array that have not be sent to Orders array
  useEffect(() => {
    setCurrentOrderList([])
    const filteredFoodItems = foodItems.filter(
      (item) => item["orderId"] === undefined
    );
   console.log("filteredFoodItems", filteredFoodItems)

    setCurrentOrderList(filteredFoodItems);
  }, [foodItems]);

  // useEffect(() => {
  //   console.log(currentOrderList)
  // },[currentOrderList])


  useEffect(() => {
    getOrders();
    getFoodItems();
    getFoodDetails();
    getIngredients();
    getFoodItemIngredients();
    getCustomers();
  }, []);

//sends the list of items to the orders array
  const sendOrder = () => {
    console.log("send order clicked")
    var date = new Date();
    var time = date.getTime();

    addToOrder({
      userId: signedInCustomer.id,
      time,
      completed: false,
    })
      .then((res) =>
        { console.log("response ID", res.id)
        currentOrderList.forEach((item) =>
          patchFoodItem({
            id: item.id,
            orderId: res.id,
          })
        )
        }
      )
      
  };

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
        onClick={sendOrder}
      />
    </Box>
  );
};


