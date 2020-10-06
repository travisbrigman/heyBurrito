import { Box, Button, Heading, List, Text } from "grommet";
import React, { useContext, useEffect, useState } from "react";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { OrderContext } from "../order/OrderProvider";
import emailjs from "emailjs-com";
import { Trash } from "grommet-icons";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";

export const EmployeeView = (history, props) => {
  const { orders, getOrders, deleteOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);
  const { getFoodItemIngredients, foodItemIngredients } = useContext(
    FoodItemContext
  );
  const { foodItems, getFoodItems } = useContext(FoodItemContext);
  const { getIngredients, ingredients } = useContext(IngredientContext);

  const [clicked, setClicked] = useState();

  const [selectedOrder, setSelectedOrder] = useState([]);
  console.log(selectedOrder);

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
    const selectedFoodItem =
      foodItems.filter((item) => item.orderId === clicked.id) || {};

    const constructedOrder = selectedFoodItem.map((object) => {
      const stateObject = {
        combo: object.combo,
        quantity: object.quantity,
        instructions: object.specialInstructions,
        orderIngredients: [],
      };

      //this will give me an array with just FoodItemIngredient Objects that match the ID of the current FoodItem.

      const ingredientIdList =
        foodItemIngredients.filter(
          (ingredient) => ingredient.foodItemId === object.id
        ) || [];

      //this should take that array and and for each object in that array, match it with a food ingredient.

      const itemIngredientList =
        ingredientIdList.map((ingredientIdObject) => {
          return ingredients.find(
            (ingredient) => ingredient.id === ingredientIdObject.ingredientId
          );
        }) || [];

      itemIngredientList.forEach((ingredient) => {
        const ingrObj = {
          category: ingredient.ingredientCategory.categoryName,
          name: ingredient.name,
        };
        stateObject.orderIngredients.push(ingrObj);
      });

      const selectedFoodDetailObject =
        foodDetails.find(
          (foodItemObject) => foodItemObject.id === object.detailId
        ) || {};

      stateObject["itemName"] = selectedFoodDetailObject.name;

      return stateObject
    });

    //setSelectedOrder(constructedOrder);
  }, [clicked]);

  useEffect(() => {
    getFoodItemIngredients();
    getIngredients();
    getOrders();
    getFoodItems();
    getFoodDetails();
  }, []);

  const deleteSelectedOrder = (deleteId) => {
    deleteOrder(deleteId);
  };

  const SelectedOrderList = () => {
    if (selectedOrder.length === 0 || selectedOrder === undefined) {
      return <Box></Box>;
    } else {
      return (
        <Box
          className="foodOrderItem"
          wrap={true}
          direction="column"
          margin="medium"
        >
          <Heading level="4" className="foodOrderItem__name">
            {selectedOrder.itemName}
          </Heading>
          <List
            pad="xsmall"
            data={selectedOrder.orderIngredients}
            primaryKey={(item) => (
              <Text size="small" weight="bold" key={item.id}>
                {item.category}
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
                margin={{ right: "xsmall" }}
                className="foodOrderItem__Combo__text"
              >
                {" "}
                Combo:{" "}
              </Text>
              <Text size="small" className="foodOrderItem__Combo">
                {" "}
                {selectedOrder.combo ? "Yes" : "No"}
              </Text>
            </Box>
            <Box className="quantityBlock" direction="row">
              <Text
                size="small"
                weight="bold"
                margin={{ right: "xsmall" }}
                className="foodOrderItem__Quantity_text"
              >
                Quantity:
              </Text>
              <Text size="small" className="foodOrderItem__Quantity">
                {selectedOrder.quantity}
              </Text>
            </Box>
            <Box className="quantityBlock" direction="row">
              <Text
                size="small"
                weight="bold"
                margin={{ right: "xsmall" }}
                className="foodOrderItem__Instructions_text"
              >
                Special Instructions:
              </Text>
              <Text size="small" className="foodOrderItem__Instructions">
                {selectedOrder.instructions}
              </Text>
            </Box>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box direction="row-responsive">
      <Box className="Order_list">
        <Heading>All Unfulfilled Orders</Heading>
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
        {orders.map((orderObject) => (
          <Button
            key={orderObject.id}
            margin="small"
            onClick={() => deleteSelectedOrder(orderObject.id)}
            icon={<Trash />}
            {...props}
          />
        ))}
      </Box>
      <Box className="Order_Details">
        {selectedOrder.map((selectedOrder) => <SelectedOrderList /> ) }
      </Box>
    </Box>
  );
};


// {selectedOrder === undefined ? <Box></Box> : <SelectedOrderList />}