import { Box, Heading, List, Text } from "grommet";
import React, { useContext, useEffect, useState } from "react";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { OrderContext } from "../order/OrderProvider";
import emailjs from "emailjs-com";

export const EmployeeView = (history, props) => {
  const { orders, getOrders, deleteOrder } = useContext(OrderContext);
  const { getFoodItemIngredients, foodItemIngredients } = useContext(
    FoodItemContext
  );
  const { foodItems, getFoodItems } = useContext(FoodItemContext)
  const { getIngredients, ingredients } = useContext(IngredientContext);

  const [clicked, setClicked] = useState();

  const [ selectedOrder, setSelectedOrder] = useState([]);
  console.log(selectedOrder)


/*
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_cmnn6de",
        e.target,
        "user_PyL4nJmYB2salLdZhF4A1"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  */

  const timeFormatter = (timestamp) => {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    // let seconds = "0" + date.getSeconds();
    //let formatTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let formatTime = hours + ":" + minutes.substr(-2);
    return formatTime;
  };

useEffect(() => {
 const stateArray = []

  //this will give me an array with just FoodItemIngredient Objects that match the ID of the current FoodItem.
  const ingredientIdList =
    foodItemIngredients.filter(
      (ingredient) => ingredient.foodItemId === clicked.id
    ) || [];

  //this should take that array and and for each object in that array, match it with a food ingredient.

  const itemIngredientList = ingredientIdList.map((ingredientIdObject) => {
    return ingredients.find(
      (ingredient) => ingredient.id === ingredientIdObject.ingredientId
    );
  }) || [];
  stateArray.push(itemIngredientList)

  const selectedFoodItem =
        foodItems.find((item) => item.orderId === clicked.id) || {};
        stateArray.push(selectedFoodItem)

  setSelectedOrder(stateArray)
  
  

}, [clicked])

  useEffect(() => {
    getFoodItemIngredients()
    getIngredients()
    getOrders();
    getFoodItems()
  }, []);

  return (
    <Box>
      <Box className="Order_list">
        <Text>All Unfulfilled Orders</Text>
        <List
          onClickItem={(event) => setClicked(event.item)}
          pad="xsmall"
          data={orders}
          primaryKey={(item) => (
            <Text size="small" weight="bold" key={item.id}>
              Order # {item.id}
            </Text>
          )}
          secondaryKey={(item) => (
            <Text size="small" color="text-weak" key={item.time}>
              Time Submitted: {timeFormatter(item.time)}
            </Text>
          )}
        />
      </Box>
      <Box className="foodOrderItem" wrap={true} direction="column">
      {/* <Heading level="4" className="foodOrderItem__name">
        {" "}
        {foodDetailObject.name}{" "}
      </Heading> */}
      <List
        pad="xsmall"
        data={selectedOrder[0]}
        primaryKey={(item) => (
          <Text size="small" weight="bold" key={item.id}>
            {item.ingredientCategory.categoryName}
          </Text>
        )}
        secondaryKey={(item) => (
          <Text size="small" color="text-weak">
            {item.name}
          </Text>
        )}
      />
      <Box direction="column">
        <Box className="comboBlock" direction="row">
          <Text
            size="small"
            weight="bold"
            margin={{right:"xsmall"}}
            className="foodOrderItem__Combo__text"
          >
            {" "}
            Combo:{" "}
          </Text>
          <Text size="small" className="foodOrderItem__Combo">
            {" "}
            {selectedOrder[1].combo ? "Yes" : "No"}
          </Text>
        </Box>
        <Box className="quantityBlock" direction="row">
        <Text size="small" weight="bold" margin={{right:"xsmall"}} className="foodOrderItem__Quantity_text">
          Quantity:  
        </Text>
        <Text size="small" className="foodOrderItem__Quantity">
          {selectedOrder[1].quantity}
        </Text>
        </Box>
        <Box className="quantityBlock" direction="row">
        <Text size="small" weight="bold" margin={{right:"xsmall"}} className="foodOrderItem__Instructions_text">
          Special Instructions:  
        </Text>
        <Text size="small" className="foodOrderItem__Instructions">
          {selectedOrder[1].specialInstructions}
        </Text>
        </Box>
      </Box>
    </Box>
      
    </Box>
  );
};
