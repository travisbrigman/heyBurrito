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

