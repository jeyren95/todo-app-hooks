import React from "react";

import ListChoice from "./ListChoice";

import "./Status.css";

const Status = ({activityListLength, completedListLength, clearCompletedList, selectListChoice, listChoice, isLightTheme}) => {
  const renderNumberOfItemsLeft = () => {
    return (activityListLength - completedListLength)
  }

  //When the user clicks the clear completed button, call clearCompletedList in the App component
  const handleClearCompletedClick = () => {
    clearCompletedList()
  }

  const handleAllChoiceClick = () => {
    selectListChoice("All")
    console.log("All list selected")
  }

  const handleCompletedChoiceClick = () => {
    selectListChoice("Completed")
    console.log("Completed list selected")
  }

  const handleActiveChoiceClick = () => {
    selectListChoice("Active")
    console.log("Active list selected")
  }


  return (
    <div
    className="status"
    style={{backgroundColor: "hsl(0, 0%, 98%)"}}
    >
      <span
      className="items-left"
      style={{color: isLightTheme ? "hsl(236, 9%, 61%)" : "hsl(234, 11%, 52%)"}}
      >
        {renderNumberOfItemsLeft()} {renderNumberOfItemsLeft() === 1 ? "item" : "items"} left
      </span>
      <span
      type="button"
      className={isLightTheme ? "light-clear-button" : "dark-clear-button"}
      style={{color: isLightTheme ? "hsl(236, 9%, 61%)" : "hsl(234, 11%, 52%)"}}
      onClick={handleClearCompletedClick}
      >
        Clear Completed
      </span>
      <div
      style={{backgroundColor: isLightTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"}}
      className={isLightTheme ? "light-list-choices" : "dark-list-choices"}
      >
        <ListChoice listChoice={listChoice} name="All" handleClick={handleAllChoiceClick} />
        <ListChoice listChoice={listChoice} name="Active" handleClick={handleActiveChoiceClick} />
        <ListChoice listChoice={listChoice} name="Completed" handleClick={handleCompletedChoiceClick} />
      </div>
    </div>
  )
}

export default Status
