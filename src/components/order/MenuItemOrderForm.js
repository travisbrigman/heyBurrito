import React, { useContext, useRef, useEffect, useState } from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { OrderContext } from "./OrderProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";

export const MenuItemForm = (props) => {
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { orders, getOrders, addToOrder } = useContext(OrderContext)
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext)

  const name = useRef(null);
  const location = useRef(null);
  const animal = useRef(null);

  const [foodItem, setFoodItem] = useState({});

  useEffect(() => {
    getIngredients();
    getOrders()
    getFoodDetails()
  }, []);

  useEffect(() => {
      const FoodDetailObject = foodDetails.find((food) => food.id === parseInt(props.match.params.id)) || {};
      setFoodItem(FoodDetailObject)
  }, [foodDetails]);

  const constructNewOrderItem = () => {

      addToOrder({
        name: name.current.value,
        //locationId,
        //animalId,
      }).then(() => props.history.push("/"));
  };

  return (
    <form className="menuItemOrderForm">
      <h2 className="menuForm__title">Build Your ${foodItem.name}</h2>
      <fieldset>
        <div className="form-group__tortilla">
          <label htmlFor="Tortilla">Tortilla </label>
          <input
            type="radio"
            value="Flour"
            checked={this.state.selectedOption === "Flour"}
            onChange={this.onValueChange}
          />
          <input
            type="radio"
            value="Chipotle"
            checked={this.state.selectedOption === "Chip"}
            onChange={this.onValueChange}
          />
        </div>
      </fieldset>
      
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault(); // Prevent browser from submitting the form
          constructNewOrderItem();
        }}
        className="btn btn-primary"
      >
        Add to Order
      </button>
    </form>
  );
};
