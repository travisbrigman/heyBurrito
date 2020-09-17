import React, { useContext, useRef, useEffect, useState } from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { OrderContext } from "./OrderProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";

export const MenuItemForm = (props) => {
  const {
    foodItems,
    getFoodItems,
    foodItemIngredients,
    getFoodItemIngredients,
    addToFoodItems,
    addToFoodItemIngredients,
  } = useContext(FoodItemContext);
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { orders, getOrders, addToOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  const rice = useRef(null);
  const quantity = useRef(null);
  const specialInstructions = useRef(null);

  const [foodItemObject, setFoodItem] = useState({});
  const [tortillas, setTortillas] = useState([]);
  const [beans, setBeans] = useState([]);
  const [meats, setMeats] = useState([]);
  const [freebies, setFreebies] = useState([]);

  //create a func , set parameter in state ==== value of what you just selected

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return [value, handleChange];
  }

  const [tortilla, setTortilla] = useInput("");
  const [beanType, setBeanType] = useInput("");
  const [meatType, setMeatType] = useInput("");

  useEffect(() => {
    getIngredients();
    getFoodItemIngredients();
    getOrders();
    getFoodDetails();
  }, []);

  useEffect(() => {
    const justTortillas =
      ingredients.filter(
        (ingredientObject) => ingredientObject.ingredientCategoryId === 1
      ) || [];
    const justBeans =
      ingredients.filter(
        (ingredientObject) => ingredientObject.ingredientCategoryId === 2
      ) || [];
    const justMeats =
      ingredients.filter(
        (ingredientObject) => ingredientObject.ingredientCategoryId === 3
      ) || [];
    const justFreebies =
      ingredients.filter(
        (ingredientObject) => ingredientObject.ingredientCategoryId === 4
      ) || [];
    setTortillas(justTortillas);
    setBeans(justBeans);
    setMeats(justMeats);
    setFreebies(justFreebies);
  }, [ingredients]);

  useEffect(() => {
    const FoodDetailObject =
      foodDetails.find((food) => food.name === "Burrito") || {}; //<-- this should be different

    setFoodItem(FoodDetailObject);
  }, [foodDetails]);

  const constructNewOrderItem = () => {
    addToFoodItems({
      tortilla: tortilla,
      beans: beanType,
      meat: meatType,
      rice: rice.current.checked,
      specialInstructions: specialInstructions.current.value,
      quantity: quantity.current.value,
    })
      .then(addToFoodItemIngredients({}))
      .then(() => props.history.push("/"));
  };

  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    console.log("Checkbox: ", name, checked);

    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    console.log("checkedItems: ", checkedItems);
  };

  return (
    <form className="menuItemObjectOrderForm">
      <h2 className="menuForm__title">Build Your {foodItemObject.name}</h2>
      <fieldset>
        <div className="form-group__tortilla">
          <h5>Tortilla</h5>
          {tortillas.map((ingredientObject) => (
            <div>
              <input
                type="radio"
                id={ingredientObject.id}
                value={ingredientObject.id}
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
        <div className="form-group__beans">
          <h5>Beans</h5>
          {beans.map((ingredientObject) => (
            <div>
              <input
                type="radio"
                id={ingredientObject.id}
                value={ingredientObject.name}
                checked={ingredientObject.name === beanType}
                onChange={setBeanType}
              />
              <label htmlFor={ingredientObject.name}>
                {ingredientObject.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group__meats">
          <h5>Meats</h5>
          {meats.map((ingredientObject) => (
            <div>
              <input
                type="radio"
                id={ingredientObject.id}
                value={ingredientObject.name}
                checked={ingredientObject.name === meatType}
                onChange={setMeatType}
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
      <fieldset>
        <div className="form-group">
          {freebies.map((ingredientObject) => (
            <label key={ingredientObject.id}>
              {ingredientObject.name}
              <Checkbox
                name={ingredientObject.name}
                checked={checkedItems[ingredientObject.name]}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-quantity">
          <label htmlFor="quantity-selector">Quantity </label>
          <input
            type="number"
            id="quantity"
            ref={quantity}
            required
            autoFocus
            className="form-quantity-selector"
            name="quantity"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions </label>
          <input
            type="text"
            id="specialInstructions"
            ref={specialInstructions}
            autoFocus
            className="form-instructions"
            placeholder="special instructions"
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
      {/* <button
        type="cancel"
        onClick= {props.history.push("/")}
        className="btn btn-cancel"
      >
        Cancel
      </button> */}
    </form>
  );
};
