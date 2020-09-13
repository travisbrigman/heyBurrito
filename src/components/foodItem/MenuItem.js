import React from "react"
import "./MenuItem.css"

export const MenuItem = ({foodDetailObject}) => (
    <section className="menuItem">
        <h3 className="menuItem__name">{foodDetailObject.name}</h3>
        <div className="menuItem__description">{foodDetailObject.description}</div>
        <div className="menuItem__image">{foodDetailObject.imageLink}</div>
        
    </section>
)