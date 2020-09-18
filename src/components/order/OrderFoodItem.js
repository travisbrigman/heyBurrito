import React from "react";



export const FoodOrderItem = ({ foodItemObject, props, deleteOrder, foodDetails }) => {

    const foodDetailObject = foodDetails.find(foodDetailObject => foodDetailObject.id === foodItemObject.detailId)

    const ItemIngredientList = () => {
        
    }
  return (
    <section className="foodOrderItem">
      <h3 className="foodOrderItem__name">{foodDetailObject.name}</h3>
      <div className="foodItem__Instructions">
        {foodItemObject.instructions}
      </div>
      <div className="foodOrderItem__Combo">{}</div>

      <button className="editFoodItem" onClick={() => props.push("/create")}>
        edit
      </button>
      <button className="editFoodItem" onClick={deleteOrder()}>
        delete
      </button>
    </section>
  );
};
