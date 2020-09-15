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
    <div className="menu">
      <h1>Our Menu</h1>
      <article className="menuList">

        {foodDetails.map((foodDetailObject) => (
          <MenuItem
            key={foodDetailObject.id}
            foodDetailObject={foodDetailObject}
            {...props}
          />
        ))}
      </article>
    </div>
  );
};
