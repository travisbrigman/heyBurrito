import React, {
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { OrderContext } from "./OrderProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { RadioButton } from "./RadioButton";

export const MenuItemForm = (props) => {
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { orders, getOrders, addToOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  const rice = useRef(null);

  const [foodItem, setFoodItem] = useState({});
 

  //create a func , set parameter in state ==== value of what you just selected

//    function useInput(initialValue) {
//     const [value, setValue] = useState(initialValue);
//     function handleChange(e) {
//       setValue(e.target.value);
//     }
//     return [value, handleChange];
//   }

  
  useEffect(() => {
    getIngredients();
    getOrders();
    getFoodDetails();
  }, []);

  useEffect(() => {
    const FoodDetailObject =
      foodDetails.find((food) => food.name === "Burrito") || {}; //<-- this should be different
      console.log(FoodDetailObject)
    setFoodItem(FoodDetailObject);
  }, [foodDetails]);

  const constructNewOrderItem = () => {
    addToOrder({
      name: '',
      rice: rice.current.checked,
    }).then(() => props.history.push("/"));
  };

  return (
    <form className="menuItemOrderForm">
      <h2 className="menuForm__title">Build Your {foodItem.name}</h2>
      <fieldset>
        <div className="form-group__tortilla">

        {const justTortillas = () => {
        ingredients.filter(ingredientObject => (
            ingredientObject.ingredientCategoryId === 1 
        ))
    }
        ingredients.map((ingredientObject) => (
          <RadioButton
            key={ingredientObject.id}
            ingredientObject={ingredientObject}
          />
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
          evt.preventDefault();// Prevent browser from submitting the form
          constructNewOrderItem();
        }}
        className="btn btn-primary"
      >
        Add to Order
      </button>
    </form>
  );
};
