import React from "react"
import { Route } from "react-router-dom"
import { FoodDetailProvider } from "./foodItem/FoodDetailProvider"
import { MenuList } from "./foodItem/MenuList"


export const ApplicationViews = () => {
    return (
        <>
            <FoodDetailProvider>
                {/* Render the location list when http://localhost:3000/ */}
                <Route exact path="/">
                    <MenuList />
                </Route>
            </FoodDetailProvider>
        </>
    )
}