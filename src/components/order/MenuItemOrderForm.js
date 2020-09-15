import React, {
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import { FoodDetailContext } from "../foodItem/FoodDetailProvider";
import { OrderContext } from "./OrderProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";

export const MenuItemForm = (props) => {
  const { ingredients, getIngredients } = useContext(IngredientContext);
  const { orders, getOrders, addToOrder } = useContext(OrderContext);
  const { foodDetails, getFoodDetails } = useContext(FoodDetailContext);

  const name = useRef(null);

  const [foodItem, setFoodItem] = useState({});

  //create a func , set parameter in state ==== value of what you just selected

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      setValue(e.target.value);
    }

    return [value, handleChange];
  }
// this is just test data, the real data needs to come from the API
  const [data] = useState({
    flour: "flour",
    chipotle: "chipotle",
    veggie: "veggie",
  });
  //-------------------------------------------------------------
  const [tortilla, setTortilla] = useInput("");

  useEffect(() => {
    getIngredients();
    getOrders();
    getFoodDetails();
  }, []);

  useEffect(() => {
    const FoodDetailObject =
      foodDetails.find((food) => food.id === parseInt(props.match.params.id)) ||
      {};
      console.log(foodDetails)
    setFoodItem(FoodDetailObject);
  }, [foodDetails]);

  const constructNewOrderItem = () => {
    addToOrder({
      name: tortilla,
      //locationId,
      //animalId,
    }).then(() => props.history.push("/"));
  };

  return (
    <form className="menuItemOrderForm">
      <h2 className="menuForm__title">Build Your {foodItem.name}</h2>
      <fieldset>
        <div className="form-group__tortilla">
          <label htmlFor="Tortilla">Tortilla </label>
          <input
            type="radio"
            id={data.flour}
            value={data.flour}
            checked={data.flour === tortilla}
            onChange={setTortilla}
          />
          <label htmlFor={data.flour}>Flour</label>
          <input
            type="radio"
            id={data.chipotle}
            value={data.chipotle}
            checked={data.chipotle === tortilla}
            onChange={setTortilla}
          />
          <label htmlFor={data.chipotle}>Chipotle</label>
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
