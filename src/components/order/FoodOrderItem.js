import React from "react";

export const FoodOrderItem = ({
  foodItemObject,
  deleteOrder,
  foodDetails,
  ingredients,
  foodItemIngredients,
}) => {
  const foodDetailObject =
    foodDetails.find(
      (foodDetailObject) => foodDetailObject.id === foodItemObject.detailId
    ) || {};

    
  const ItemIngredientList = ({ingredients}) => {
    //this will give me an array with just FoodItemIngredient Objects that match the ID of the current FoodItem.
    const ingredientIdList =
      foodItemIngredients.filter(
        (ingredient) => ingredient.foodItemId === foodItemObject.id
      ) || [];

    //this should take that array and and for each object in that array, match it with a food ingredient.
 
    const itemIngredientList =
      ingredientIdList.map((ingredientIdObject) => {
        return ingredients.find(
          (ingredient) => ingredient.id === ingredientIdObject.ingredientId
        );
      })
    return <div>{itemIngredientList}</div>;
  };

  return (
    <section className="foodOrderItem">
      <h3 className="foodOrderItem__name">{foodDetailObject.name}</h3>
      <div className="foodOrderItem__Instructions">
        {foodItemObject.specialInstructions}
      </div>
      <div className="foodOrderItem__Combo">{}</div>
      <div className="foodOrderItem__Quantity">{foodItemObject.quantity}</div>
      <ItemIngredientList
        key={foodItemIngredients.id}
        foodItemIngredients={foodItemIngredients}
        ingredients={ingredients}
        foodItemObject={foodItemObject}
      />

      <button className="editFoodItem" onClick="">
        edit
      </button>
      <button className="deleteFoodItem" onClick="">
        delete
      </button>
    </section>
  );
};

//-----------------------------------------------------------------------
/*
<button
className="btn--release"
onClick={() => {
  releaseEmployee(employee.id).then(() => {
    props.history.push("/employees");
  });
}}
>
Release Employee
</button>
*/