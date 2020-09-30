import React, { useContext, useEffect, useState } from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Heading,
  Main,
  RadioButton,
  Text,
  TextInput,
} from "grommet";
import { NumberInput } from "grommet-controls";

export const BurritoItemOrderForm = (props) => {
  const {
    foodItems,
    getFoodItems,
    foodItemIngredients,
    getFoodItemIngredients,
    addToFoodItems,
    addToFoodItemIngredients,
    // updateFoodItem,
    deleteFoodOrderItemIngredient,
  } = useContext(FoodItemContext);
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  //🎛 🎛 🎛 COMPONENT STATE STUFF 🎛 🎛 🎛
  const [state, setState] = useState({
    quantity: 1,
    combo: false,
    // specialInstructions: null,
  });


  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
    console.log(state);
  }

  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    const requiredProperties = ["tortilla", "bean", "meat"];
    const buttonProps = []
    requiredProperties.forEach((prop) => {
      if (state.hasOwnProperty(prop)) {
        buttonProps.push(prop)
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
        if (radioObject.ingredient.ingredientCategoryId === 2) {
          editState["bean"] = radioObject.ingredient.name;
        }
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
    (ingredient) => ingredient.ingredientCategoryId === 1
  );
  const beanTypes = ingredients.filter(
    (ingredient) => ingredient.ingredientCategoryId === 2
  );
  const meatTypes = ingredients.filter(
    (ingredient) => ingredient.ingredientCategoryId === 3
  );
  const freebies = ingredients.filter(
    (ingredient) => ingredient.ingredientCategoryId === 4
  );
  const premiumIngredients = ingredients.filter(
    (ingredient) => ingredient.ingredientCategoryId === 5
  );
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

    //Actual post request
    addToFoodItems({
      specialInstructions: state.specialInstructions,
      quantity: parseInt(state.quantity),
      detailId: foodDetails[0].id,
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

    //Edit Mode UPDATE
    if (editMode) {
      deleteFoodOrderItemIngredient(foodItemId)
        .then(
          addToFoodItems({
            foodItemId,
            specialInstructions: state.specialInstructions,
            quantity: parseInt(state.quantity),
            detailId: foodDetails[0].id,
            combo: state.combo,
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

  //❌ ❌ ❌ Cancel Button ❌ ❌ ❌
  const cancel = () => {
    props.history.push("/");
  };

  return (
    <Main>
      <Form>
        <Heading>{foodDetails[0].name}</Heading>
        <Box direction="column">
          <Heading level="5">Tortilla</Heading>
          <Box
            direction="row-responsive"
            justify="start"
            align="center"
            pad="small"
            gap="medium"
          >
            <Text label={state.error}>{state.error}</Text>
            <FormField required>
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
            </FormField>
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
                required={true}
              />
            ))}
          </Box>
        </Box>
        <Box direction="column">
          <Heading level="5">Meat</Heading>

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
                required={true}
              />
            ))}
          </Box>
        </Box>
        <Box direction="row-responsive">
          <Box>
            <h3>Free Ingredients</h3>
            {freebies.map((freebie) => (
              <Box key={freebie.id}pad={{ horizontal: "small", vertical: "xsmall" }}>
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
            <h3>Premium Ingredients</h3>
            {premiumIngredients.map((premium) => (
              <Box key={premium.id} pad={{ horizontal: "small", vertical: "xsmall" }}>
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
            >
              <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
                <CheckBox
                  reverse={true}
                  id="combo"
                  name="combo"
                  label="Combo Meal?"
                  checked={state["combo"]}
                  onChange={handleChange}
                  required={true}
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
                  min={1}
                  max={6}
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
                // suggestions={state.suggestions}
              />
            </FormField>

            <Button
              disabled={buttonState}
              primary={true}
              margin="small"
              pad="small"
              label="Add To Order"
              onClick={(evt) => {
                evt.preventDefault(); // Prevent browser from submitting the form
                constructNewOrderItem();
              }}
              {...props}
            />
            <Button
              margin="small"
              pad="small"
              label="cancel"
              onClick={cancel}
              className="btn btn-cancel"
            />
          </Box>
        </Box>
      </Form>
    </Main>
  );
};
