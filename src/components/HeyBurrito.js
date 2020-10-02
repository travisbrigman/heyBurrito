import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/Navbar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./HeyBurrito.css";
import { CustomerProvider } from "./customers/CustomerProvider";


export const HeyBurrito = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("heyBurrito_customer")) {
          return (
            <>
              <CustomerProvider>
                <Route render={(props) => <ApplicationViews {...props} />} />
              </CustomerProvider>
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login" render={(props) => <Login {...props} />} />
    <Route path="/register" render={(props) => <Register {...props} />} />
  </>
);
