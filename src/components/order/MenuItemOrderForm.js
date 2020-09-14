import React, { useContext, useRef, useEffect } from "react"
import { FoodDetailContext } from "../foodItem/FoodDetailProvider"


export const MenuItemForm = (props) => {
    const { ingredients, getIngredients } = useContext(IngredientContext)

    const name = useRef(null)
    const location = useRef(null)
    const animal = useRef(null)

    useEffect(() => {
       getIngredients()
    }, [])

    const constructNewOrderItem = () => {

        const locationId = parseInt(location.current.value)
        const animalId = parseInt(animal.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            addToOrder ({
                name: name.current.value,
                locationId,
                animalId
            })
            .then(() => props.history.push("/"))
        }
    }

    return (
        <form className="menuItemOrderForm">
            <h2 className="menuForm__title">Build Your ${FoodDetailObject.name}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Tortilla">Tortilla </label>
                    <input type="text" id="employeeName" ref={name} required autoFocus className="form-control" placeholder="Employee name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="employeeLocation" className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Caretaker for: </label>
                    <select defaultValue="" name="animal" ref={animal} id="employeeAnimal" className="form-control" >
                        <option value="0">Select an animal</option>
                        {animals.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewOrderItem()
                }}
                className="btn btn-primary">
                Add to Order
            </button>
        </form>
    )
}