import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { MenuList } from "./foodItem/MenuList";
import { CustomerContext } from "./customers/CustomerProvider";
import { FoodDetailProvider } from "./foodItem/FoodDetailProvider";
import { OrderProvider } from "./order/OrderProvider";
import { IngredientProvider } from "./ingredients/IngredientProvider";
import { FoodItemProvider } from "./foodItem/FoodItemProvider";
import { OrderList } from "./order/OrderList";
import { BurritoItemOrderForm } from "./order/BurritoItemOrderForm";
import { TacoItemOrderForm } from "./order/TacoItemOrderForm";
import {
  Box,
  Button,
  Heading,
  Grommet,
  Footer,
  Header,
  Image,
  Text,
  Anchor,
} from "grommet";
import { Logout } from "grommet-icons";
import { burritoTheme } from "./CustomGrommetTheme";
import { EmployeeView } from "./employee/EmployeeView";
const logo = require("../assets/burrito256.png");

export const ApplicationViews = (props) => {
  const { getCustomers, signedInCustomer } = useContext(CustomerContext);

  useEffect(() => {
    getCustomers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/Login");
  };

  return (
    <Grommet full theme={burritoTheme}>
      <Header wrap={true} direction="row" justify="between" align="center">
        <Box margin="small" direction="row" elevation="large" round="small">
          <Heading>HeyBurrito!</Heading>
          <Box>
            <Image
              src={logo}
              alt="a tasty looking burrito"
              height="80 px"
              width="80 px"
            ></Image>
          </Box>
        </Box>
        <Box margin="small" gap="small" justify="start" direction="column">
          <Text>Hello {signedInCustomer.name}</Text>
          {/* <img src={ signedInCustomer.avatar.path } alt="customer avatar"/> */}
          <Button
            label="Log Out"
            onClick={() => handleLogout()}
            {...props}
            icon={<Logout />}
          />
        </Box>
      </Header>
      <Box direction="row-responsive" justify="between">
        <Box className="body-left"></Box>
        <Box className="body-center">
          <FoodDetailProvider>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/" render={(props) => <MenuList {...props} />} />
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
                  <Route
                    path="/employeeView"
                    render={(props) => <EmployeeView {...props} />}
                  />
                </IngredientProvider>
              </OrderProvider>
            </FoodDetailProvider>
          </FoodItemProvider>
        </Box>
        <Box className="body-right">
          <Box height={{ max: 'large' }} overflow="auto" wrap={true} direction="column">
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
      </Box>
      <Footer>
        <Box direction="row-responsive" margin="small" justify="center">
          Icons made by{" "}
          <Anchor
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik"
            alignSelf="center"
            size="small"
            justify="center"
            margin={{"horizontal": "xsmall"}}
          >
            Freepik
          </Anchor>{" "}
          from{" "}
          <Anchor
            href="https://www.flaticon.com/"
            title="Flaticon"
            alignSelf="center"
            size="small"
            justify="center"
            margin={{"horizontal": "xsmall"}}
          >
            {" "}
            www.flaticon.com
          </Anchor>
        </Box>
      </Footer>
    </Grommet>
  );
};
