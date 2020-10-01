import React from "react"
import "./MenuItem.css"
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image
  } from "grommet";
  import burrito from "/Users/travislaptop/workspace/hey-burrito/src/assets/MenuItems/Burrito-500x375.jpg"
  import taco from "/Users/travislaptop/workspace/hey-burrito/src/assets/MenuItems/fish-tacos.jpg"
  import { Add } from "grommet-icons"

  export const MenuItem = ( { foodDetails, foodDetailObject, history, props }  ) => {
      let image = ""
      if (foodDetailObject.id === 1) {
            image = burrito
      } else {
          image = taco
      }
    return (
        <Card pad="xsmall" height="medium" width="small">
        <CardBody direction= "column" className="menuItem">
        <CardHeader pad="xsmall" level="5" className="menuItem__name">{ foodDetailObject.name }</CardHeader>
        <Box width="small" height="small">
        <Image fit="cover" className="menuItem__image" src={image} alt={ foodDetailObject.altImgDesc} />
        </Box>
    </CardBody>
        <CardFooter direction="column" pad="xsmall" className="menuItem__description">{ foodDetailObject.description }
    <Button pad="xsmall" label="Add" onClick={() => history.push(`/create${foodDetailObject.name}`)} {...props} icon={<Add/>} />
        </CardFooter>
    </Card>
    )
}

