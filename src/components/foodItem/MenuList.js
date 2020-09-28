import { Box, Heading } from "grommet";
import React, { useContext, useEffect } from "react";
import { FoodDetailContext } from "./FoodDetailProvider";
import { MenuItem } from "./MenuItem";
import "./MenuItem.css";

export const MenuList = (props) => {
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  useEffect(() => {
    getFoodDetails();
  }, []);

  return (
    <Box className="menu">
      <Heading level="3">Our Menu</Heading>
      <Box className="menuList">

        {foodDetails.map((foodDetailObject) => (
          <MenuItem
            key={foodDetailObject.id}
            foodDetailObject={foodDetailObject}
            foodDetails={foodDetails}
            {...props}
          />
        ))}
      </Box>
    </Box>
  );
};
