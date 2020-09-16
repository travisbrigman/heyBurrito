import React from "react"
import { useState } from "react"

export const RadioButton = ( { ingredientObject }  ) => {
    function useInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        function handleChange(e) {
          setValue(e.target.value);
        }
        return [value, handleChange];
      }
    const [tortilla, setTortilla] = useInput("");

    return (
        <div>
        <input
            type="radio"
            id={ingredientObject.id}
            value={ingredientObject.name}
            checked={ingredientObject.name === tortilla}
            onChange={setTortilla}
          />
          <label htmlFor={ingredientObject.name}>{ingredientObject.name}</label>
          </div>
    )
}


    // <section className="menuItem">
    //     <h3 className="menuItem__name">{ foodDetailObject.name }</h3>
    //     <div className="menuItem__description">{ foodDetailObject.description }</div>
    //     <img className="menuItem__image" src={ foodDetailObject.imageLink } alt={ foodDetailObject.altImgDesc} />
    //     <button className="addToOrder" onClick={() => history.push("/create")}>Customize & Add</button>
    // </section>

