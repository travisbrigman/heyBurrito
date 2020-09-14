import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { FoodDetailProvider } from "./foodItem/FoodDetailProvider";
import { MenuList } from "./foodItem/MenuList";
import { CustomerContext } from "./customers/CustomerProvider";
const logo = require("/Users/travislaptop/workspace/hey-burrito/src/assets/burrito256.png");

export const ApplicationViews = (props) => {
  const { getCustomers, signedInCustomer } = useContext(CustomerContext);

  useEffect(() => {
    getCustomers()
  }, []);
  

  console.log(signedInCustomer)

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/Login");
  };

  return (
    <>
      <header>
        <h1>HeyBurrito!</h1>
        <img src={logo} alt="a tasty looking burrito" height="80 px"></img>
        <div>Hello {signedInCustomer.name}</div>
        {/* <img src={ signedInCustomer.avatar.path } alt="customer avatar"/> */}
        <button onClick={() => handleLogout()}>Log Out</button>
      </header>
      <div>
        <article className="body-left"></article>
        <article className="body-center">
          <FoodDetailProvider>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
              <MenuList />
            </Route>
          </FoodDetailProvider>
        </article>
        <article className="body-right"></article>
      </div>
      <footer>
        <small>
          <div>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </div>
        </small>
      </footer>
    </>
  );
};
