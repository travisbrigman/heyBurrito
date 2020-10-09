import { Box, Button, DataTable, Heading, List, Text } from "grommet";
import React, { useContext, useEffect, useState } from "react";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { OrderContext } from "../order/OrderProvider";
import { CustomerContext } from "../customers/CustomerProvider";
import emailjs from "emailjs-com";
import { Send, Trash } from "grommet-icons";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { init } from "emailjs-com";
init("user_PyL4nJmYB2salLdZhF4A1");

export const EmployeeView = (history, props) => {
  const { orders, getOrders, deleteOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);
  const { getFoodItemIngredients, foodItemIngredients } = useContext(
    FoodItemContext
  );
  const { foodItems, getFoodItems } = useContext(FoodItemContext);
  const { getIngredients, ingredients } = useContext(IngredientContext);
  const { getCustomers, customers } = useContext(CustomerContext);

  const [clicked, setClicked] = useState();
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [customerName, setCustomerName] = useState({});
  console.log(selectedOrder);

  const sendEmail = () => {
    const orderListHTML = `<h1>${customerName.name}</h1>
    ${selectedOrder
      .map((order) => {
        return `
        <h3><u>${order.itemName}</u></h3>
        <div><strong>Quantity:</strong> ${order.quantity}</div>
        <div><strong>Combo?</strong> ${order.combo}</div>
        <div><strong>Special Instructions:</strong> ${order.instructions}</div>
        ${order.orderIngredients
          .map((ingredient) => {
            return `<div><strong>${ingredient.category}</strong>: ${ingredient.name}</div> `;
          })
          .join("")}
        `;
      })
      .join("")}
  `;
    var templateParams = {
      orderListHTML,
    };

    emailjs.send("service_dim4dgi", "template_cmnn6de", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };



  useEffect(() => {
    const clickedCustomer = customers.find(
      (customer) => customer.id === clicked.userId
    );

    setCustomerName(clickedCustomer);

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

      return stateObject;
    });

    setSelectedOrder(constructedOrder);
  }, [clicked]);

  useEffect(() => {
    getFoodItemIngredients();
    getIngredients();
    getOrders();
    getFoodItems();
    getFoodDetails();
    getCustomers();
  }, []);

  const deleteSelectedOrder = (deleteId) => {
    deleteOrder(deleteId);
  };

  const nameOnOrder = (userId) => {
    const userObject = customers.find((customer) => customer.id === userId) || {}
    let name = userObject.name;
    return name;
  };

  const timeFormatter = (timestamp) => {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    // let seconds = "0" + date.getSeconds();
    //let formatTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let formatTime = hours + ":" + minutes.substr(-2);
    return formatTime;
  };


  const columns = [
    {
      property: "id",
      header: <Text>Orders</Text>,
    },
    {
      property: "userId",
      header: "user name",
      render: (datum) => nameOnOrder(datum.id),
    },
    {
      property: "time",
      header: "Order Placed",
      render: (datum) => timeFormatter(datum.time),
    },
  ];

  const SelectedOrderList = ({ selectedOrder }) => {
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
        <Box direction="row-responsive">
          <Box>
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
          <Box>
            {orders.map((orderObject) => (
              <Button
                key={orderObject.id}
                onClick={() => deleteSelectedOrder(orderObject.id)}
                icon={<Trash />}
                {...props}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="orderAndSend" direction="column">
        <Box className="Order_Details">
          {selectedOrder.map((selectedOrder) => (
            <SelectedOrderList selectedOrder={selectedOrder} />
          ))}
        </Box>
        <Button onClick={sendEmail} icon={<Send />} {...props} />
      </Box>
      {/*----------------------*/}
      <Box>
        <DataTable
          resizeable="true"
          sortable="true"
          size="small"
          columns={columns}
          data={orders}
        />
      </Box>
    </Box>
  );
};
