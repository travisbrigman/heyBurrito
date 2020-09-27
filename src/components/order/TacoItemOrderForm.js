import React, { useContext, useEffect, useState } from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";

export const TacoItemOrderForm = (props) => {
  const {
    foodItems,
    getFoodItems,
    foodItemIngredients,
    getFoodItemIngredients,
    addToFoodItems,
    addToFoodItemIngredients,
    updateFoodItem,
    deleteFoodOrderItemIngredient,
  } = useContext(FoodItemContext);
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  
  //🎛 🎛 🎛 COMPONENT STATE STUFF 🎛 🎛 🎛
  const [state, setState] = useState({
    "Shredded Cheese": true,
    Lettuce: true,
    quantity: 1
  });
  const [meatState, setMeatState] = useState([]);
  
  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
    console.log(state);
  }

  useEffect(() => {
    getIngredients();
    getFoodDetails();
    getFoodItems();
    getFoodItemIngredients();
  }, []);

  useEffect(() => {
    setMeatState(meatTypes);
  }, [ingredients]);

  //📝 📝 📝 EDIT MODE STUFF 📝 📝 📝

  //TODO: when guac is posted as meat/protein, make it show as such in OrderList and when editing make it come up in the guac radio button.

  useEffect(() => {
    if (editMode) {
      const editState = {};
      const selectedFoodItem =
        foodItems.find((item) => item.id === foodItemId) || {};

      editState["specialInstructions"] = selectedFoodItem.specialInstructions;
      editState["quantity"] = selectedFoodItem.quantity;
      editState["combo"] = selectedFoodItem.combo

      //creates an array of ingredients that are associated with the selected food item
      const selected = foodItemIngredients.filter(
        (ingredient) => ingredient.foodItemId === foodItemId
      );
      //creates radio button state values
      const radioButtonIngredients = selected.filter(
        (selectedObject) =>
          selectedObject.ingredient.ingredientCategoryId === 1 ||
          selectedObject.ingredient.ingredientCategoryId === 2 ||
          selectedObject.ingredient.ingredientCategoryId === 3
      );

      radioButtonIngredients.forEach((radioObject) => {
        if (radioObject.ingredient.ingredientCategoryId === 1) {
          editState["tortilla"] = radioObject.ingredient.name;
        }
      });
      radioButtonIngredients.forEach((radioObject) => {
        if (radioObject.ingredient.ingredientCategoryId === 2) {
          editState["bean"] = radioObject.ingredient.name;
        }
      });
      radioButtonIngredients.forEach((radioObject) => {
        if (radioObject.ingredient.ingredientCategoryId === 3) {
          editState["meat"] = radioObject.ingredient.name;
        }
      });
      //gets just ingredients that should be a checkbox
      const checkBoxIngredients = selected.filter(
        (selectedObject) =>
          selectedObject.ingredient.ingredientCategoryId === 4 ||
          selectedObject.ingredient.ingredientCategoryId === 5 ||
          selectedObject.ingredient.ingredientCategoryId === 6
      );
      //creates an array of objects that are {name : true}
      checkBoxIngredients.forEach((ingredientObject) => {
        editState[ingredientObject.ingredient.name] = true;
      });
      setState(editState);
    }
  }, [foodItems, foodItemIngredients]);
  const editMode = props.match.params.hasOwnProperty("foodItemObjectId");
  const foodItemId = parseInt(props.match.params.foodItemObjectId);

  //✅ 🔘 ✍🏼 FORM DATA SETUP ✅ 🔘 ✍🏼
  const tortillaTypes = ingredients.filter(
    (ingredient) => ingredient.id === 1 || ingredient.id === 25
  );

  const beanTypes = ingredients.filter(
    (ingredient) => ingredient.ingredientCategoryId === 2
  );
  const meatTypes = ingredients.filter(
    (ingredient) =>
      ingredient.id === 3 ||
      ingredient.id === 8 ||
      ingredient.id === 9 ||
      ingredient.id === 10 ||
      ingredient.id === 21 ||
      ingredient.id === 24
  );

  const freebies = ingredients.filter(
    (ingredient) => ingredient.ingredientCategoryId === 4
  );

  freebies.splice(0, 3);
  const salsas = ingredients.filter(
    (ingredient) =>
      ingredient.id === 13 || ingredient.id === 14 || ingredient.id === 15
  );

  const premiumIngredients = ingredients.filter(
    (ingredient) => ingredient.ingredientCategoryId === 5
  );

  //this removes guac as premium ingredient if guac is selected as a meat
  if (Object.values(state).indexOf("Guacamole") > -1) {
    premiumIngredients.splice(0, 1);
  }

  //📡 📡 FORM SUBMISSION FUNCTION 📡 📡
  const constructNewOrderItem = () => {
    // This is basically a meat grinder that finds all the properties in the state object and matches them with the appropriate ingredient object
    const tortillaToPost = tortillaTypes.find(
      (tortilla) => tortilla.name === state.tortilla
    );
    const beanToPost = beanTypes.find((bean) => bean.name === state.bean);
    const meatToPost = meatTypes.find((meat) => meat.name === state.meat);

    const foodItemData = [tortillaToPost, beanToPost, meatToPost];

    for (const [key, value] of Object.entries(state)) {
      if (value === true && key !== "combo") {
        const foundIngredient = ingredients.find(
          (ingredient) => ingredient.name === key
        );
        foodItemData.push(foundIngredient);
      }
    }
console.log(foodItemData)
debugger
    //Actual post request
    addToFoodItems({
      specialInstructions: state.specialInstructions,
      quantity: parseInt(state.quantity),
      detailId: foodDetails[1].id,
      combo: state.combo
    })
      .then((res) =>
        foodItemData.forEach((i) =>
          addToFoodItemIngredients({
            ingredientId: i.id,
            foodItemId: res.id,
          })
        )
      )
      .then(getFoodItems)
      .then(() => props.history.push("/"));

    //Edit Mode UPDATE
    if (editMode) {
      deleteFoodOrderItemIngredient(foodItemId)
        .then(
          updateFoodItem({
            id: foodItemId,
            specialInstructions: state.specialInstructions,
            quantity: parseInt(state.quantity),
            detailId: foodDetails[1].id,
            combo: state.combo
          })
        )
        .then(
          foodItemData.forEach((i) =>
            addToFoodItemIngredients({
              ingredientId: i.id,
              foodItemId: foodItemId,
            })
          )
        )
        .then(getFoodItems)
        .then(() => props.history.push("/"));
    }
  };

  return (
    <form>
      {/* <div>{foodDetails[1].name}</div> */}

      <fieldset>
        <h3>Tortilla</h3>
        {tortillaTypes.map((tortilla) => (
          <label key={tortilla.id}>
            {tortilla.name}
            <input
              type="radio"
              name="tortilla"
              value={tortilla.name}
              checked={state.tortilla === tortilla.name}
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h3>Beans</h3>
        {beanTypes.map((bean) => (
          <label key={bean.id}>
            {bean.name}
            <input
              type="radio"
              name="bean"
              value={bean.name}
              checked={state.bean === bean.name}
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h3>Meats</h3>
        {meatTypes.map((meat) => (
          <label key={meat.id}>
            {meat.name}
            <input
              type="radio"
              name="meat"
              value={meat.name}
              checked={state.meat === meat.name}
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h3>Salsa</h3>
        {salsas.map((salsas) => (
          <label key={salsas.id}>
            {salsas.name}
            <input
              type="checkbox"
              name={salsas.name}
              checked={state[salsas.name]}
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h3>Free Ingredients</h3>
        {freebies.map((freebie) => (
          <label key={freebie.id}>
            {freebie.name}
            <input
              type="checkbox"
              name={freebie.name}
              checked={state[freebie.name]}
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h3>Premium Ingredients</h3>
        {premiumIngredients.map((premium) => (
          <label key={premium.id}>
            {premium.name}
            <input
              type="checkbox"
              name={premium.name}
              checked={state[premium.name]}
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h3>Combo Meal?</h3>
          <label>
            <input
              type="checkbox"
              name="combo"
              checked={state["combo"]}
              onChange={handleChange}
            />
          </label>
      </fieldset>
      <fieldset>
        <div className="form-quantity">
          <label htmlFor="quantity-selector">Quantity </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max="6"
            defaultValue="1"
            required
            autoFocus
            className="form-quantity-selector"
            name="quantity"
            value={state.quantity}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <label>
        <div className="specialInstructions">Special Instructions</div>
        <input
          type="text"
          name="specialInstructions"
          value={state.specialInstructions}
          onChange={handleChange}
        />
      </label>
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
