import React, { useState } from "react";

//    The context is imported and used by individual components that need data

export const OrderContext = React.createContext();

// This component establishes what data can be used.

export const OrderProvider = (props) => {
  const [orders, setOrders] = useState([]);

  const deleteOrder = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}`, {
      method: "DELETE",
    }).then(getOrders);
  };

  const getOrders = () => {
    return fetch("http://localhost:8088/orders")
      .then((res) => res.json())
      .then(setOrders);
  };

  const addToOrder = (orderObject) => {
    return fetch("http://localhost:8088/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObject),
    }).then(getOrders);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addToOrder,
        getOrders,
        deleteOrder
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};
