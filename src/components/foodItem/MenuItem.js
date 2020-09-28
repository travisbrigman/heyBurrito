import React, { useEffect } from "react"
import "./MenuItem.css"
import {
    Box,
    Button,
    Card,
    Heading,
    Image
  } from "grommet";
  import burrito from "/Users/travislaptop/workspace/hey-burrito/src/assets/MenuItems/Burrito-500x375.jpg"
  import taco from "/Users/travislaptop/workspace/hey-burrito/src/assets/MenuItems/fish-tacos.jpg"

  export const MenuItem = ( { foodDetails, foodDetailObject, history, props }  ) => {

      let image = ""
      if (foodDetailObject.id === 1) {
            image = burrito
      } else {
          image = taco
      }
      console.log(foodDetailObject)
    return (
        <Card>
        <Box direction= "column" className="menuItem">
        <Heading Level="4" className="menuItem__name">{ foodDetailObject.name }</Heading>
        <Image fit="cover" className="menuItem__image" src={image} alt={ foodDetailObject.altImgDesc} />
        <Box className="menuItem__description">{ foodDetailObject.description }</Box>
        <Button label="Customize & Add" onClick={() => history.push(`/create${foodDetailObject.name}`)} {...props} />
    </Box>
    </Card>
    )
}

