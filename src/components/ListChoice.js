import React from "react";


const ListChoice = ({name, listChoice, handleClick}) => {
  return (
    <span
    type="button"
    style={{color: listChoice === name ? "hsl(220, 98%, 61%)": "hsl(236, 9%, 61%)" }}
    onClick={handleClick}
    >
      {name}
    </span>
  )
}

export default ListChoice
