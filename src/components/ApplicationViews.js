import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { MenuList } from "./foodItem/MenuList";
import { CustomerContext } from "./customers/CustomerProvider";
import { MenuItemForm } from "./order/MenuItemOrderForm";
import { FoodDetailProvider } from "./foodItem/FoodDetailProvider";
import { OrderProvider } from "./order/OrderProvider";
import { IngredientProvider } from "./ingredients/IngredientProvider";
import { FoodItemProvider } from "./foodItem/FoodItemProvider";
import { OrderList } from "./order/OrderList";
import { DeleteFoodOrderItem } from "./order/DeleteFoodOrderItem";
import { BurritoItemOrderForm } from "./order/BurritoItemOrderForm";
import { TacoItemOrderForm } from "./order/TacoItemOrderForm";
import {
  Box,
  Button,
  Heading,
  Grommet,
  ResponsiveContext, Footer, Header, Text
} from "grommet";
const logo = require("/Users/travislaptop/workspace/hey-burrito/src/assets/burrito256.png");

export const ApplicationViews = (props) => {
  const theme = {
    global: {
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px",
      },
    },
  };
  const { getCustomers, signedInCustomer } = useContext(CustomerContext);

  useEffect(() => {
    getCustomers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/Login");
  };

  return (
    <Grommet theme={theme}>  
        <Header direction="row" justify="between" align="center">
          <Box direction="row">
          <Heading>HeyBurrito!</Heading>
          <Box>
          <img src={logo} alt="a tasty looking burrito" height="80 px"></img>
          </Box>
          </Box>
          <Box direction="column">
          <Text>Hello {signedInCustomer.name}</Text>
          {/* <img src={ signedInCustomer.avatar.path } alt="customer avatar"/> */}
          <Button label="Log Out" onClick={() => handleLogout()} {...props} />
          </Box>
        </Header>
        <Box direction="row-responsive" justify="between">
          <article className="body-left"></article>
          <Box className="body-center">
            <FoodDetailProvider>
              {/* Render the location list when http://localhost:3000/ */}
              <Route
                exact
                path="/"
                render={(props) => <MenuList {...props} />}
              />
            </FoodDetailProvider>

            <FoodItemProvider>
              <FoodDetailProvider>
                <OrderProvider>
                  <IngredientProvider>
                    <Route
                      exact
                      path="/createTacos"
                      render={(props) => <TacoItemOrderForm {...props} />}
                    />
                    <Route
                      exact
                      path="/createBurrito"
                      render={(props) => <BurritoItemOrderForm {...props} />}
                    />
                    <Route
                      path="/editBurrito/:foodItemObjectId(\d+)"
                      render={(props) => <BurritoItemOrderForm {...props} />}
                    />
                    <Route
                      path="/editTacos/:foodItemObjectId(\d+)"
                      render={(props) => <TacoItemOrderForm {...props} />}
                    />
                  </IngredientProvider>
                </OrderProvider>
              </FoodDetailProvider>
            </FoodItemProvider>
          </Box>
          <Box className="body-right">
            <Heading level="3">Current Order</Heading>
            <OrderProvider>
              <FoodItemProvider>
                <FoodDetailProvider>
                  <IngredientProvider>
                    <Route
                      exact
                      path="/"
                      render={(props) => <OrderList {...props} />}
                    />
                  </IngredientProvider>
                </FoodDetailProvider>
              </FoodItemProvider>
            </OrderProvider>
          </Box>
        </Box>
        <Footer>
          <small>
            <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                {" "}
                www.flaticon.com
              </a>
            </div>
          </small>
        </Footer>

    </Grommet>
  );
};
