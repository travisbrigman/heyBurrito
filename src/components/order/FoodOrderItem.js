import React, { useContext, useEffect } from "react";
import { FoodItemContext } from "../foodItem/FoodItemProvider";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { Box, Button, Heading, List, Text } from "grommet";
import { Edit, Trash } from "grommet-icons"

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

  const deleteOrderItem = () => {
    deleteFoodOrderItem(foodItemObject.id);
  };

  return (
    <Box className="foodOrderItem" wrap={true} direction="column" elevation="xsmall" round="small" margin="small">
      <Heading level="4" className="foodOrderItem__name" margin="xsmall">
        {" "}
        {foodDetailObject.name}{" "}
      </Heading>
      <List
        pad="xsmall"
        data={itemIngredientList}
        primaryKey={(item) => (
          <Text size="small" weight="bold" key={item.id}>
            {item.ingredientCategory.categoryName}
          </Text>
        )}
        secondaryKey={(item) => (
          <Text size="small" color="text-weak"key={item.name}>
            {item.name}
          </Text>
        )}
      />
      <Box direction="column">
        <Box className="comboBlock" direction="row">
          <Text
            size="small"
            weight="bold"
            margin={{right:"xsmall"}}
            className="foodOrderItem__Combo__text"
          >
            {" "}
            Combo:{" "}
          </Text>
          <Text size="small" className="foodOrderItem__Combo">
            {" "}
            {foodItemObject.combo ? "Yes" : "No"}
          </Text>
        </Box>
        <Box className="quantityBlock" direction="row">
        <Text size="small" weight="bold" margin={{right:"xsmall"}} className="foodOrderItem__Quantity_text">
          Quantity:  
        </Text>
        <Text size="small" className="foodOrderItem__Quantity">
          {foodItemObject.quantity}
        </Text>
        </Box>
        <Box className="quantityBlock" direction="row">
        <Text size="small" weight="bold" margin={{right:"xsmall"}} className="foodOrderItem__Instructions_text">
          Special Instructions:  
        </Text>
        <Text size="small" className="foodOrderItem__Instructions">
          {foodItemObject.specialInstructions}
        </Text>
        </Box>
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
            icon={<Edit/>}
          />
          <Button
            margin="small"
            label="Delete"
            onClick={deleteOrderItem}
            {...props}
            icon={<Trash/>}
          />
        </Box>
      </Box>
    </Box>
  );
};
