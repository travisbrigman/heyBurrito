import { Box, List, Text } from "grommet";
import React, { useContext, useEffect } from "react";
import { OrderContext } from "../order/OrderProvider";

export const EmployeeView = (history, props) => {
  const { orders, getOrders, deleteOrder } = useContext(OrderContext);

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
    getOrders();
  }, []);

  console.log(orders);
  return (
    <Box>
      <Text>Hello World</Text>
      <List
        pad="xsmall"
        data={orders}
        primaryKey={(item) => (
          <Text size="small" weight="bold" key={item.id}>
            Order Number {item.id}
          </Text>
        )}
        secondaryKey={(item) => (
          <Text size="small" color="text-weak" key={item.time}>
            {timeFormatter(item.time)}
          </Text>
        )}
      />
    </Box>
  );
};
