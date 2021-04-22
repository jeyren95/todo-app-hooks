import React, {useState, useEffect} from "react";

import "./Activity.css";

import cross from "../images/icon-cross.svg";
import check from "../images/icon-check.svg";

const Activity = ({activityName, index, deleteActivity, addCompletedActivity, deleteCompletedActivity, listChoice, isLightTheme}) => {
  const [isCompleted, setIsCompleted] = useState(false)

  //When the user clicks the check, set the isCompleted state to the opposite of whatever it was
  const handleCheckClick = () => {
    setIsCompleted(!isCompleted)
    console.log("Activity has been checked or unchecked")
  }

  //Call addCompletedActivity in App component if the activity has been completed
  //If not, call deleteCompletedActivity in App component
  const checkIfCompleted = () => {
    if (isCompleted) {
      addCompletedActivity(activityName)
      console.log("Activity has been completed")
    } else {
      deleteCompletedActivity(activityName)
      console.log("Activity has been unchecked")
    }
  }

  //Whenever the isCompleted state is changed, i want to call checkIfCompleted
  useEffect(checkIfCompleted, [isCompleted])

  //When the user clicks the cross, call deleteActivity() in the App component
  const handleCrossClick = () => {
    deleteActivity(index)
    console.log(`Activity to be deleted is at position ${index} in the array`)
  }

  const renderActivityDisplay = () => {
    if (listChoice === "All") {
      return ""
    } else if (listChoice === "Completed") {
      if (isCompleted) {
        return ""
      } else {
        return "none"
      }
    } else {
      if (isCompleted) {
        return "none"
      } else {
        return ""
      }
    }
  }

  //When the user starts dragging the activity, i want to store the data of that activity
  const handleDragStart = (event) => {
    event.dataTransfer.setData("activity_id", activityName)
    console.log("Drag start")
  }

  return (
    <div
    className="activity"
    id={activityName}
    style={{
      backgroundColor: isLightTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)",
      borderBottom: isLightTheme ? "solid thin hsl(233, 11%, 84%)" : "solid thin hsl(233, 14%, 35%)",
      display: renderActivityDisplay()
    }}
    draggable
    onDragStart={handleDragStart}
    >
      <div
      type="button"
      className="circle"
      style={{border: isLightTheme ? "solid thin hsl(233, 11%, 84%)" : "solid thin hsl(233, 14%, 35%)"}}
      onClick={handleCheckClick}>
        <img src={check} alt="" style={{display: isCompleted ? "" : "none"}}/>
      </div>
      <div className="activity-name">
        <p style={{
          textDecoration: isCompleted ? "line-through": "",
          color: isCompleted ? "hsl(233, 11%, 84%)" : "hsl(235, 19%, 35%)"
        }}
        >
          {activityName}
        </p>
        <img src={cross} type="button" onClick={handleCrossClick} alt="" />
      </div>
    </div>
  )
}

export default Activity
