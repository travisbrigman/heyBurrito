import React from "react"
import "./MenuItem.css"

export const MenuItem = ( { foodDetailObject, history }  ) => {
    console.log(history)
    return (
    <section className="menuItem">
        <h3 className="menuItem__name">{ foodDetailObject.name }</h3>
        <div className="menuItem__description">{ foodDetailObject.description }</div>
        <img className="menuItem__image" src={ foodDetailObject.imageLink } alt={ foodDetailObject.altImgDesc} />
        <button className="addToOrder" onClick={() => history.push("/create")}>Add to Order</button>
    </section>
    )
}