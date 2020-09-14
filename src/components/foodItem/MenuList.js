import React, { useContext, useEffect } from "react";
import { FoodDetailContext } from "./FoodDetailProvider";
import { MenuItem } from "./MenuItem";
import "./MenuItem.css";

export const MenuList = (props) => {
  // This state changes when `getAnimals()` is invoked below
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  useEffect(() => {
    getFoodDetails();
  }, []);

  //TODO::finish route on line 19
  return (
    <div className="menu">
      <h1>Our Menu</h1>
      <article className="menuList">
      <button className="addToOrder" onClick={() => props.history.push("/")}>Add to Order</button>
        {foodDetails.map((foodDetailObject) => (
          <MenuItem
            key={foodDetailObject.id}
            foodDetailObject={foodDetailObject}
          />
        ))}
      </article>
    </div>
  );
};
