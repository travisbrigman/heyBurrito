import React, { useContext, useEffect } from "react";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { Box, Button, Heading, List, Text } from "grommet";

export const FoodOrderItem = ({
  foodItemObject,
  foodDetails,
  history,
  props,
}) => {
  const {
    deleteFoodOrderItem,
    getFoodItemIngredients,
    foodItemIngredients,
  } = useContext(FoodItemContext);
  const { getIngredients, ingredients } = useContext(IngredientContext);

  const foodDetailObject =
    foodDetails.find(
      (foodDetailObject) => foodDetailObject.id === foodItemObject.detailId
    ) || {};

  useEffect(() => {
    getIngredients();
    getFoodItemIngredients();
  }, []);

  //const ItemIngredientList = ({ ingredients }) => {
  //this will give me an array with just FoodItemIngredient Objects that match the ID of the current FoodItem.
  const ingredientIdList =
    foodItemIngredients.filter(
      (ingredient) => ingredient.foodItemId === foodItemObject.id
    ) || [];

  //this should take that array and and for each object in that array, match it with a food ingredient.

  const itemIngredientList = ingredientIdList.map((ingredientIdObject) => {
    return ingredients.find(
      (ingredient) => ingredient.id === ingredientIdObject.ingredientId
    );
  });
  //return itemIngredientList.map((ingredient) => {
  //return (
  // <div key={ingredient.id}>
  //   {ingredient.ingredientCategory.categoryName}: {ingredient.name}

  // </div>
  //);
  //});
  //};

  const deleteOrderItem = () => {
    deleteFoodOrderItem(foodItemObject.id);
  };

  return (
    <Box className="foodOrderItem">
      <Heading level="4" className="foodOrderItem__name"> {foodDetailObject.name} </Heading>
      <List
        pad="xsmall"
        data={itemIngredientList}
        primaryKey={(item) => (
          <Text size="small" weight="bold" key={item.id}>
            {item.ingredientCategory.categoryName}
          </Text>
        )}
        secondaryKey={(item) => (
          <Text size="small" color="text-weak">
            {item.name}
          </Text>
        )}
      />
      <Box direction="column">
        <Text size="small"  className="foodOrderItem__Combo">Combo: {foodItemObject.combo ? 'Yes' : 'No'}</Text>
        <Text size="small" className="foodOrderItem__Quantity">
          Quantity: {foodItemObject.quantity}
        </Text>
        <Text size="small" className="foodOrderItem__Instructions">
          Special Instructions: {foodItemObject.specialInstructions}
        </Text>
        <Box direction="row">
          <Button
          secondary={true}
          margin="small"
            label="edit"
            onClick={() => {
              if (foodItemObject.detailId === 1) {
                history.push(`/editBurrito/${foodItemObject.id}`);
              } else if (foodItemObject.detailId === 2) {
                history.push(`/editTacos/${foodItemObject.id}`);
              }
            }}
            {...props}
          />
          <Button margin="small" label="Delete" onClick={deleteOrderItem} {...props} />
        </Box>
      </Box>
    </Box>
  );
};
