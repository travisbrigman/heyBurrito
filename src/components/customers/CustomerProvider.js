import React, { useState } from "react";

//    The context is imported and used by individual components that need data

export const CustomerContext = React.createContext();

// This component establishes what data can be used.

export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState([]);

  //"http://localhost:8088/customers"
  const getCustomers = () => {
    return fetch("https://db-hey-burrito.herokuapp.com/customers")
      .then((res) => res.json())
      .then(setCustomers);
  };

  const addCustomer = (customer) => {
    return fetch("https://db-hey-burrito.herokuapp.com/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }).then(getCustomers);
  };

  const currentUser = () => {
    return parseInt(localStorage.getItem("heyBurrito_customer"));
  };
  const userID = currentUser();


  const signedInCustomer =
    customers.find((customer) => customer.id === userID) || {};


  /*
        You return a context provider which has the
        `customers` state, the `addCustomer` function,
        and the `getcustomer` function as keys. This
        allows any child elements to access them.
    */
  return (
    <CustomerContext.Provider
      value={{
        customers,
        addCustomer,
        getCustomers,
        signedInCustomer,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};
