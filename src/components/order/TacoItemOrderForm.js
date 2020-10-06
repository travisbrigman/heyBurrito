import React, { useContext, useEffect, useState } from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import {
  Box,
  Button,
  CheckBox,
  FormField,
  Heading,
  Main,
  RadioButton,
  TextInput,
} from "grommet";
import { NumberInput } from "grommet-controls";

import { Add, Close, Edit } from "grommet-icons"

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
    quantity: 1,
  });
  //const [meatState, setMeatState] = useState([]);

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    const requiredProperties = ["tortilla", "bean", "meat"];
    const buttonProps = [];
    requiredProperties.forEach((prop) => {
      if (state.hasOwnProperty(prop)) {
        buttonProps.push(prop);
      }
      if (buttonProps.length === requiredProperties.length) {
        setButtonState(false);
      }
    });
  });

  useEffect(() => {
    getIngredients();
    getFoodDetails();
    getFoodItems();
    getFoodItemIngredients();
  }, []);

  //📝 📝 📝 EDIT MODE STUFF 📝 📝 📝

  useEffect(() => {
    if (editMode) {
      const editState = {};
      const selectedFoodItem =
        foodItems.find((item) => item.id === foodItemId) || {};

      editState["specialInstructions"] = selectedFoodItem.specialInstructions;
      editState["quantity"] = selectedFoodItem.quantity;
      editState["combo"] = selectedFoodItem.combo;

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
      ingredient.id === 24 ||
      ingredient.id === 27
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

  //this removes guacamole as premium ingredient if guac is selected as a meat
  if (Object.values(state).indexOf("Guac") > -1) {
    premiumIngredients.splice(0, 1);
  }
  //this removes guac as meat if guacamole is selected as a meat
  if (Object.values(state).indexOf("Guacamole") > -1) {
    meatTypes.splice(5, 1);
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

    //Edit Mode UPDATE
    if (editMode) {
      const cleanUp = foodItemIngredients.filter(item => item.foodItemId === foodItemId)
     
     cleanUp.forEach(item => deleteFoodOrderItemIngredient(item.id))
      
        //.then(
          updateFoodItem(foodItemId,{
            specialInstructions: state.specialInstructions,
            quantity: parseInt(state.quantity),
            detailId: foodDetails[1].id,
            combo: state.combo,
          })
        //)
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
    } else {
          //Actual post request
    addToFoodItems({
      specialInstructions: state.specialInstructions,
      quantity: parseInt(state.quantity),
      detailId: foodDetails[1].id,
      combo: state.combo,
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
    }
  };

  //❌ ❌ ❌ Cancel Button ❌ ❌ ❌
  const cancel = () => {
    props.history.push("/");
  };
  return (
    <Main>
      {/* <Heading>{foodDetails[1].name}</Heading> */}
      <Box direction="column">
        <Heading margin="xsmall" level="5">
          Tortilla
        </Heading>
        <Box
          className="taco-tortillas"
          direction="row-responsive"
          justify="start"
          align="center"
          gap="medium"
          margin="small"
          pad="small"
          required={true}
        >
          {tortillaTypes.map((tortilla) => (
              <RadioButton
                key={tortilla.id}
                label={tortilla.name}
                name="tortilla"
                value={tortilla.name}
                checked={state.tortilla === tortilla.name}
                onChange={handleChange}
              />
          ))}
        </Box>
      </Box>
      <Box direction="column">
        <Heading level="5">Beans</Heading>
        <Box
          direction="row-responsive"
          justify="start"
          align="center"
          pad="small"
          gap="medium"
        >
          {beanTypes.map((bean) => (
            <RadioButton
              key={bean.id}
              label={bean.name}
              name="bean"
              value={bean.name}
              checked={state.bean === bean.name}
              onChange={handleChange}
            />
          ))}
        </Box>
      </Box>
      <Box direction="column">
        <Heading level="5">Protein</Heading>

        <Box
          direction="row-responsive"
          justify="start"
          align="center"
          pad="small"
          gap="medium"
        >
          {meatTypes.map((meat) => (
            <RadioButton
              key={meat.id}
              label={meat.name}
              name="meat"
              value={meat.name}
              checked={state.meat === meat.name}
              onChange={handleChange}
            />
          ))}
        </Box>
      </Box>
      <Box direction="column">
        <Heading level="5">Salsa</Heading>
        <Box direction="row-responsive" justify="start" align="center">
          {salsas.map((salsas) => (
            <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
              <CheckBox
                id={`salsa-${salsas.id}`}
                key={salsas.id}
                type="checkbox"
                name={salsas.name}
                label={salsas.name}
                checked={state[salsas.name]}
                onChange={handleChange}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box direction="row-responsive">
        <Box>
          <Heading level="5">Free Ingredients</Heading>
          {freebies.map((freebie) => (
            <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
              <CheckBox
                key={freebie.id}
                type="checkbox"
                id={`freebie-${freebie.id}`}
                name={freebie.name}
                label={freebie.name}
                checked={state[freebie.name]}
                onChange={handleChange}
              />
            </Box>
          ))}
        </Box>
        <Box>
          <Heading level="5">Premium Ingredients</Heading>
          {premiumIngredients.map((premium) => (
            <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
              <CheckBox
                key={premium.id}
                type="checkbox"
                id={`premium-${premium.id}`}
                name={premium.name}
                label={premium.name}
                checked={state[premium.name]}
                onChange={handleChange}
              />
            </Box>
          ))}
        </Box>
        <Box direction="column" align="end" fill="horizontal">
          <FormField
            name="comboField"
            htmlFor="comboField"
            required
            pad="medium"
          >
            <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
              <CheckBox
                reverse={true}
                id="combo"
                name="combo"
                label="Combo Meal?"
                checked={state["combo"]}
                onChange={handleChange}
              />
            </Box>
          </FormField>

          <Box direction="row" justify="start" align="center">
            <Heading level="4">Quantity </Heading>
            <Box pad="small" width="small">
              <NumberInput
                value={state.quantity}
                onChange={({ target: { value } }) =>
                  setState({
                    ...state,
                    quantity: value,
                  })
                }
                min="1"
                max="6"
              />
            </Box>
          </Box>

          <FormField
            label="Special Instructions"
            htmlFor="specialInstructions"
            {...props}
          >
            <TextInput
              id="specialInstructions"
              name="specialInstructions"
              placeholder="e.g. light on the beans..."
              value={state.specialInstructions}
              onChange={handleChange}
              onSelect={handleChange}
            />
          </FormField>
          <Button
            disabled={buttonState}
            primary={true}
            label={editMode ? "Make Changes" : "Add To Order"}
            margin="small"
            pad="small"
            onClick={(evt) => {
              evt.preventDefault(); // Prevent browser from submitting the form
              constructNewOrderItem();
            }}
            {...props}
            icon={editMode ? <Edit/> : <Add />}
          />
          <Button
            margin="small"
            pad="small"
            label="cancel"
            onClick={cancel}
            className="btn btn-cancel"
            icon={<Close/>}
          />
        </Box>
      </Box>
    </Main>
  );
};
