import React, { useContext, useEffect } from "react";
import { FoodDetailContext } from "./FoodDetailProvider";
import { MenuItem } from "./MenuItem";
import "./MenuItem.css";

export const MenuList = (props) => {
  // This state changes when `getAnimals()` is invoked below
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  useEffect(() => {
    getFoodDetails();
    console.log(props)
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
