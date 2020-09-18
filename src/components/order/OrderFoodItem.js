import React from "react";



export const FoodOrderItem = ({ foodItemObject, props, deleteOrder, foodDetails, ingredients, foodItemIngredients }) => {

    const foodDetailObject = foodDetails.find(foodDetailObject => foodDetailObject.id === foodItemObject.detailId)

    const ItemIngredientList = () => {
        //this will give me an array with just FoodItemIngredient Objects that match the ID of the current FoodItem.
        const ingredientIdList = foodItemIngredients.filter(ingredient => ingredient.foodItemId === foodItemObject.id)

        //this should take that array and and for each object in that array, match it with a food ingredient.
        const itemIngredientList = ingredientIdList.map(ingredientIdObject => {
            return ingredients.find( ingredient => ingredient.id === ingredientIdObject.ingredientsId)

        })
        return itemIngredientList
            
            
    }
    return (
    <section className="foodOrderItem">
      <h3 className="foodOrderItem__name">{foodDetailObject.name}</h3>
      <div className="foodItem__Instructions">
        {foodItemObject.instructions}
      </div>
      <div className="foodOrderItem__Combo">{}</div>
      <ItemIngredientList></ItemIngredientList>

      <button className="editFoodItem" onClick={() => props.push("/create")}>
        edit
      </button>
      <button className="editFoodItem" onClick={deleteOrder()}>
        delete
      </button>
    </section>
  );
};

/*
export const CustomerList = () => {
    // This state changes when `getCustomers()` is invoked below
    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        getCustomers()
    },[])

    return (
        <div className="customers">
        {
            customers.map(customerObject => <Customer key={customerObject.id} customer={customerObject} />)
        }
        </div>
    )
}
*/