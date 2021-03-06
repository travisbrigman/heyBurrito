import {
  Box,
  Button,
  CheckBox,
  DataTable,
  Heading,
  Layer,
  List,
  Text,
} from "grommet";
import React, { useContext, useEffect, useState } from "react";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { OrderContext } from "../order/OrderProvider";
import { CustomerContext } from "../customers/CustomerProvider";
import emailjs from "emailjs-com";
import {
  Send,
  Trash,
  FormClose,
  StatusGood,
  FormCheckmark,
} from "grommet-icons";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { init } from "emailjs-com";
init("user_PyL4nJmYB2salLdZhF4A1");

export const EmployeeView = (props) => {
  const { orders, getOrders, deleteOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);
  const { getFoodItemIngredients, foodItemIngredients } = useContext(
    FoodItemContext
  );
  const { foodItems, getFoodItems } = useContext(FoodItemContext);
  const { getIngredients, ingredients } = useContext(IngredientContext);
  const { getCustomers, customers } = useContext(CustomerContext);

  const [checked, setChecked] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [customerName, setCustomerName] = useState({});

  const [open, setOpen] = useState();

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  const sendEmail = () => {
    const orderListHTML = customerName
      .map((name) => {
        return `<h1>${name.name}</h1> ${selectedOrder
          .map((order) => {
            return order
              .map((item) => {
                return `
        <h3><u>${item.itemName}</u></h3>
        <div><strong>Quantity:</strong> ${item.quantity}</div>
        <div><strong>Combo?</strong> ${item.combo}</div>
        <div><strong>Special Instructions:</strong> ${item.instructions}</div>
        ${item.orderIngredients
          .map((ingredient) => {
            return `<div><strong>${ingredient.category}</strong>: ${ingredient.name}</div>`;
          })
          .join("")}    
        `;
              })
              .join("");
          })
          .join("")}
  `;
      })
      .join("");
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
    //finds the objects from the Orders collection that are associated with the checked orders in the list
    const checkedOrders = checked.map((checkedOrder) => {
      const userOrder = orders.find((order) => order.id === checkedOrder);
      return userOrder;
    });

    const namesOnCheckedOrders = customers.filter((customer) => {
      const orderNames = checkedOrders.find((checkedOrders) => {
        return customer.id === checkedOrders.userId;
      });
      return orderNames;
    });

    setCustomerName(namesOnCheckedOrders);

    const selectedFoodItems = checkedOrders.map((checkedObject) => {
      return (
        foodItems.filter((item) => item.orderId === checkedObject.id) || {}
      );
    });

    const constructedOrder = selectedFoodItems.map((array) => {
      const stateArray = [];

      array.forEach((object) => {
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
        stateArray.push(stateObject);
      });
      return stateArray;
    });

    setSelectedOrder(constructedOrder);
  }, [checked]);

  useEffect(() => {
    getFoodItemIngredients();
    getIngredients();
    getOrders();
    getFoodItems();
    getFoodDetails();
    getCustomers();
  }, []);

  const deleteSelectedOrder = () => {
    checked.forEach((checkedNum) => {
      deleteOrder(checkedNum);
    });
    setSelectedOrder([]);
    onClose();
  };

  const nameOnOrder = (userId) => {
    const userObject =
      customers.find((customer) => customer.id === userId) || {};
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
      header: "Orders",
      size: "xsmall",
      primary: true,
    },
    {
      property: "userId",
      header: "User Name",
      render: (datum) => nameOnOrder(datum.userId),
      size: "xsmall",
    },
    {
      property: "time",
      header: "Order Placed",
      render: (datum) => timeFormatter(datum.time),
      size: "xsmall",
    },
  ];

  const controlledColumns = columns.map((col) => ({ ...col }));

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter((item) => item !== value));
    }
  };

  const onCheckAll = (event) =>
    setChecked(event.target.checked ? orders.map((datum) => datum.id) : []);

  console.log(selectedOrder);

  const SelectedOrderList = ({ selectedOrder }) => {
    if (selectedOrder.length === 0 || selectedOrder === undefined) {
      return <Box></Box>;
    } else {
      return customerName.map((name) => {
        return (
          <Box key={selectedOrder.id}>
            <Heading margin="xsmall" level="6">
              {name.name}
            </Heading>
            <Box
              className="foodOrderItem"
              direction="column"
              margin="medium"
            >
              <Heading
                margin="xsmall"
                level="6"
                className="foodOrderItem__name"
              >
                {selectedOrder.itemName}
              </Heading>
              <List
                pad="xsmall"
                data={selectedOrder.orderIngredients}
                primaryKey={(item) => (
                  <Text
                    size="small"
                    weight="bold"
                    key={selectedOrder.id + item.id}
                  >
                    {item.category}
                  </Text>
                )}
                secondaryKey={(item) => (
                  <Text
                    size="small"
                    color="text-weak"
                    key={item.name + item.id}
                  >
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
          </Box>
        );
      });
    }
  };

  return (
    <Box direction="row" wrap={true} margin="medium" justify="between">
      <Box direction="column" className="Order_list" wrap={true} margin="medium" animation="fadeIn">
        <Heading>All Unfulfilled Orders</Heading>
        <Box height={{ max: "large" }} width={{ max: "small" }} wrap={true}>
          <DataTable
          wrap={true}
            fill={{ horizontal: false }}
            columns={[
              {
                property: "checkbox",
                size: "xsmall",
                render: (datum) => (
                  <CheckBox
                    size="xsmall"
                    key={datum.id}
                    checked={checked.indexOf(datum.id) !== -1}
                    onChange={(e) => onCheck(e, datum.id)}
                  />
                ),
                header: (
                  <CheckBox
                    size="xsmall"
                    checked={checked.length === orders.length}
                    indeterminate={
                      checked.length > 0 && checked.length < orders.length
                    }
                    onChange={onCheckAll}
                  />
                ),
                sortable: false,
              },
              ...controlledColumns,
            ].map((col) => ({ ...col }))}
            data={orders}
            sortable
            size="medium"
          />
        </Box>
      </Box>
      <Box className="orderAndSend" direction="column" wrap={true} margin="medium">
        <Box direction="row">
          <Button margin="large" onClick={sendEmail} icon={<Send />} {...props} />
          <Button margin="large" onClick={onOpen} icon={<Trash />} {...props} />
        </Box>
        <Box direction="column"  className="Order_Details">
          {selectedOrder.map((selectedOrderArrObj) => (
            <Box direction="column">
            {selectedOrderArrObj.map((selectedOrder) => (
              <SelectedOrderList
                selectedOrder={selectedOrder}
                key={selectedOrder.id}
              />
            ))}
            </Box>
            ))}
        </Box>
      </Box>
      {open && (
        <Layer
          position="bottom"
          modal={false}
          margin={{ vertical: "medium", horizontal: "small" }}
          onEsc={onClose}
          responsive={false}
          plain
        >
          <Box
            align="center"
            direction="row"
            gap="small"
            justify="between"
            round="medium"
            elevation="medium"
            pad={{ vertical: "xsmall", horizontal: "small" }}
            background="status-ok"
          >
            <Box align="center" direction="row" gap="xsmall">
              <StatusGood />
              <Text>Are you sure you want to delete these items?</Text>
            </Box>
            <Button
              icon={<FormCheckmark />}
              onClick={deleteSelectedOrder}
              plain
            />
            <Button icon={<FormClose />} onClick={onClose} plain />
          </Box>
        </Layer>
      )}B
    </Box>
  );
};
