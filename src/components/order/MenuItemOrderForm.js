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
    updateFoodItem,
    deleteFoodOrderItemIngredient,
  } = useContext(FoodItemContext);
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { orders, getOrders, addToOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  const [foodDetailObject, setFoodDetailObject] = useState({});
  const [foodItemObject, setFoodItem] = useState({});
  const [tortillas, setTortillas] = useState([]);
  const [beans, setBeans] = useState([]);
  const [meats, setMeats] = useState([]);
  const [freebies, setFreebies] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});

  const [tortilla, setTortilla] = useInput("");
  const [beanType, setBeanType] = useInput("");
  const [meatType, setMeatType] = useInput("");

  const editMode = props.match.params.hasOwnProperty("foodItemObjectId");

  const handleControlledInputChange = (event) => {
    const newFoodOrderItem = Object.assign({}, foodItemObject);
    newFoodOrderItem[event.target.name] = event.target.value;
    setFoodItem(newFoodOrderItem);
  };

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const foodItemId = parseInt(props.match.params.foodItemObjectId);
  const getFoodItemInEditMode = () => {
    if (editMode) {
      const selectedFoodItem =
        foodItems.find((item) => item.id === foodItemId) || {};
      setFoodItem(selectedFoodItem);
      if (selectedIngredients.length > 0) {
        const tortillaToEdit = selectedIngredients.find(
          (selectedObject) =>
            selectedObject.ingredient.ingredientCategoryId === 1
        );
        const beanToEdit = selectedIngredients.find(
          (selectedObject) =>
            selectedObject.ingredient.ingredientCategoryId === 2
        );
        const meatToEdit = selectedIngredients.find(
          (selectedObject) =>
            selectedObject.ingredient.ingredientCategoryId === 3
        );

        setTortilla(tortillaToEdit.ingredient.name);
        setBeanType(beanToEdit.ingredient.name);
        setMeatType(meatToEdit.ingredient.name);

      }
    }
  };

  useEffect(() => {
    const x = {};
    const foodItemId = parseInt(props.match.params.foodItemObjectId);
    const selected = foodItemIngredients.filter(
      (ingredient) => ingredient.foodItemId === foodItemId
    );
    //gets just ingredients that should be a checkbox
    const checkBoxIngredients = selected.filter(
      (selectedObject) =>
        selectedObject.ingredient.ingredientCategoryId === 4 ||
        selectedObject.ingredient.ingredientCategoryId === 6
    );
    //creates an array of objects that are {name : true}
    checkBoxIngredients.forEach((ingredientObject) => {
      x[ingredientObject.ingredient.name] = true;
    });
    setSelectedIngredients(selected);
    setCheckedItems(x);
  }, [foodItemIngredients]);

  useEffect(() => {
    getFoodItemInEditMode();
  }, [foodItems]);

  useEffect(() => {
    getIngredients();
    getFoodItemIngredients();
    getOrders();
    getFoodDetails();
    getFoodItems();
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

    setFoodDetailObject(FoodDetailObject);
  }, [foodDetails]);

  const constructNewOrderItem = () => {
    const tortillaIngredient = tortillas.find(
      (selectedTortilla) => selectedTortilla.name === tortilla
    );
    const beanIngredient = beans.find(
      (selectedBean) => selectedBean.name === beanType
    );
    const meatIngredient = meats.find(
      (selectedMeat) => selectedMeat.name === meatType
    );

    const foodItemData = [tortillaIngredient, beanIngredient, meatIngredient];

    for (const [key, value] of Object.entries(checkedItems)) {
      const foundIngredient = ingredients.find(
        (ingredient) => ingredient.name === key
      );
      foodItemData.push(foundIngredient);
    }

    if (editMode) {
      updateFoodItem({
        id: foodItemId,
        specialInstructions: foodItemObject.specialInstructions,
        quantity: parseInt(foodItemObject.quantity),
        detailId: foodDetailObject.id,
      })
        .then(deleteFoodOrderItemIngredient(foodItemId))
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
      addToFoodItems({
        specialInstructions: foodItemObject.specialInstructions,
        quantity: parseInt(foodItemObject.quantity),
        detailId: foodDetailObject.id,
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

  /*✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ CHECK BOX STUFF✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ */
  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {

    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  /*✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ CHECK BOX STUFF✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ */
  //create a func , set parameter in state ==== value of what you just selected
  /*🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘RADIO BUTTON STUFF🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘*/
  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      if (editMode) {
        setValue(e);
      } else {
        setValue(e.target.value);
      }
    }
    return [value, handleChange];
  }

  /*🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘RADIO BUTTON STUFF🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘*/

  return (
    <form className="menuItemObjectOrderForm">
      <h2 className="menuForm__title">Build Your {foodDetailObject.name}</h2>
      <fieldset>
        <div className="form-group__tortilla">
          <h5>Tortilla</h5>
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
          <label key="23">
            Rice?
            <Checkbox
              name={"Rice"}
              checked={checkedItems["Rice"]}
              onChange={handleChange}
            />
          </label>
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
            min="1"
            max="6"
            defaultValue="1"
            required
            autoFocus
            className="form-quantity-selector"
            name="quantity"
            value={foodItemObject.quantity}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions </label>
          <input
            type="text"
            name="specialInstructions"
            id="specialInstructions"
            autoFocus
            className="form-instructions"
            placeholder="special instructions"
            value={foodItemObject.specialInstructions}
            onChange={handleControlledInputChange}
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
