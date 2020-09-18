import React, { useContext, useEffect } from "react"
import { OrderContext } from "./OrderProvider"
import { FoodItemContext } from "../foodItem/FoodItemProvider"
import { OrderFoodItem } from "./OrderFoodItem"
import { FoodDetailContext } from "../foodItem/FoodDetailProvider"



export const OrderList = () => {
    
    const { orders, getOrders } = useContext(OrderContext)
    const { foodItems, getFoodItems } = useContext(FoodItemContext)
    const { foodDetails, getFoodDetails } = useContext(FoodDetailContext)
    const { deleteOrder } = useContext(OrderContext)

    useEffect(() => {
        getOrders()
        getFoodItems()
        getFoodDetails()
    },[])

    return (
        <div className="orders">
        {
            getFoodItems.map(foodItemObject => <OrderFoodItem key={foodItemObject.id} foodItemObject={foodItemObject} deleteOrder={deleteOrder} foodDetails={foodDetails} />)
        }
        </div>
    )
}