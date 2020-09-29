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
    return (
        <Card pad="xsmall">
        <Box direction= "column" className="menuItem">
        <Heading level="4" className="menuItem__name">{ foodDetailObject.name }</Heading>
        <Box width="medium" height="medium">
        <Image fit="cover" className="menuItem__image" src={image} alt={ foodDetailObject.altImgDesc} />
        </Box>
        <Box pad="small" className="menuItem__description">{ foodDetailObject.description }</Box>
        <Button pad="xsmall" label="Customize & Add" onClick={() => history.push(`/create${foodDetailObject.name}`)} {...props} />
    </Box>
    </Card>
    )
}

