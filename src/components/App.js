import React, {useState} from "react";

import Activity from "./Activity";
import Status from "./Status";
import Header from "./Header";

import "./App.css"

const App = () => {
  const [activityList, setActivityList] = useState([])
  const [completedList, setCompletedList] = useState([])
  const [listChoice, setListChoice] = useState("All")
  const [isLightTheme, setIsLightTheme] = useState(true)

  //When user submits the form, I want to add the new activity to the current list of activities
  //Change the state to the updated list of activities
  const addActivity = (newActivity) => {
    if (activityList.includes(newActivity)) {
      alert("Activity is already on the list!")
    } else {
      setActivityList([...activityList, newActivity])
      console.log("New activity added")
    }
  }

  //When user clicks the cross of the activity, delete the activity from the list based on its index
  const deleteActivity = (index) => {
    const listToBeUpdated = [...activityList]
    listToBeUpdated.splice(index, 1)

    setActivityList(listToBeUpdated)
    console.log("Activity deleted")
  }

  //Add the completed activity to the completed list when the user checks the button
  const addCompletedActivity = (completedActivity) => {
    setCompletedList([...completedList, completedActivity])
    console.log("Completed activity added")
  }

  //Delete that activity if the user checks the button twice
  const deleteCompletedActivity = (completedActivity) => {
    const completedListToBeUpdated = [...completedList]
    const indexOfCompletedActivity = completedListToBeUpdated.indexOf(completedActivity)

    completedListToBeUpdated.splice(indexOfCompletedActivity, 1)

    setCompletedList(completedListToBeUpdated)
    console.log("Completed activity deleted")
  }

  const clearCompletedList = () => {
    const listToBeUpdated = [...activityList]

    completedList.forEach((completedActivity) => {
      const indexOfCompletedActivity = listToBeUpdated.indexOf(completedActivity)
      listToBeUpdated.splice(indexOfCompletedActivity, 1)
    })

    setActivityList(listToBeUpdated)
    setCompletedList([])
    console.log("Completed activities have been cleared")
    console.log("Completed list has been cleared")
  }

  const selectListChoice = (selectedChoice) => {
    setListChoice(selectedChoice)
  }

  // Render the activity list
  const renderList = () => {
    return activityList.map((activity) => {
      return (
        <Activity
        key={activity}
        activityName={activity}
        index={activityList.indexOf(activity)}
        deleteActivity={deleteActivity}
        addCompletedActivity={addCompletedActivity}
        deleteCompletedActivity={deleteCompletedActivity}
        listChoice={listChoice}
        isLightTheme={isLightTheme}
        />
      )
    })
  }

  //This will allow the activity to be dragged over into the droppable area
  const handleDragOver = (event) => {
    event.preventDefault();
  }

  //This handles the dropping of the activity that is being dragged
  const handleDrop = (event) => {
    const listToBeUpdated = [...activityList]
    //Retrieve the data to be dropped through the use of the "activity_id" key
    const activityToBeDropped = event.dataTransfer.getData("activity_id")
    const indexOfActivityToBeDropped = listToBeUpdated.indexOf(activityToBeDropped)
    console.log(activityToBeDropped)

    //Retrieve the target activity that you want to drop at
    const targettedActivity = event.target.innerHTML
    const indexOfTargettedActivity = listToBeUpdated.indexOf(targettedActivity)
    console.log(targettedActivity)

    //Remove the activity to be dropped from the list
    listToBeUpdated.splice(indexOfActivityToBeDropped, 1)

    //Add that activity to the index of the targetted activity
    listToBeUpdated.splice(indexOfTargettedActivity, 0, activityToBeDropped)

    setActivityList(listToBeUpdated)
  }

  const changeTheme = () => {
    setIsLightTheme(!isLightTheme)
    console.log("Theme has been changed")
  }

  return (
    <div>
      <Header
      addActivity={addActivity}
      isLightTheme={isLightTheme}
      changeTheme={changeTheme}
      />
      <div className="list-and-functions">
        <div className="activity-list" onDragOver={handleDragOver} onDrop={handleDrop}>
          {renderList()}
        </div>
        <Status
        activityListLength={activityList.length}
        completedListLength={completedList.length}
        clearCompletedList={clearCompletedList}
        selectListChoice={selectListChoice}
        listChoice={listChoice}
        isLightTheme={isLightTheme}
        />
      </div>
      <div className="drag-and-drop-sign">
        <p
        style={{color: isLightTheme ? "hsl(236, 9%, 61%)" : "hsl(234, 11%, 52%)"}}
        >
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  )
}

export default App
