import React, { useContext, useRef, useEffect, useState } from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { OrderContext } from "./OrderProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";

export const MenuItemForm = (props) => {
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { orders, getOrders, addToOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  const rice = useRef(null);

  const [foodItem, setFoodItem] = useState({});
  const [tortillas, setTortillas] = useState([]);

  //create a func , set parameter in state ==== value of what you just selected

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return [value, handleChange];
  }

  const [tortilla, setTortilla] = useInput("");

  useEffect(() => {
    getIngredients();
    getOrders();
    getFoodDetails();
  }, []);

    useEffect(() => {
  const justTortillas =
    ingredients.filter(
      (ingredientObject) => ingredientObject.ingredientCategoryId === 1
    ) || [];
  setTortillas(justTortillas);
    }, [ingredients]);

  useEffect(() => {
    const FoodDetailObject =
      foodDetails.find((food) => food.name === "Burrito") || {}; //<-- this should be different

    setFoodItem(FoodDetailObject);
  }, [foodDetails]);

  const constructNewOrderItem = () => {
    addToOrder({
      tortilla: tortilla,
      rice: rice.current.checked,
    }).then(() => props.history.push("/"));
  };

  return (
    <form className="menuItemOrderForm">
      <h2 className="menuForm__title">Build Your {foodItem.name}</h2>
      <fieldset>
        <div className="form-group__tortilla">
          {tortillas.map((ingredientObject) => (
            <div>
              <input
                type="radio"
                id={ingredientObject.id}
                value={ingredientObject.name}
                checked={ingredientObject.name === tortilla}
                onChange={setTortilla}
              />
              <label htmlFor={ingredientObject.name}>
                {ingredientObject.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="rice-check-box">rice? </label>
          <input
            type="checkbox"
            id="rice"
            ref={rice}
            required
            autoFocus
            className="form-control"
            name="rice"
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
