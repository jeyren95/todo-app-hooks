import React, {useState} from "react";

import "./Header.css";
import sun from "../images/icon-sun.svg";
import moon from "../images/icon-moon.svg";
import lightBackgroundImage from "../images/bg-desktop-light.jpg";
import darkBackgroundImage from "../images/bg-desktop-dark.jpg"

const Header = ({addActivity, isLightTheme, changeTheme}) => {
  const [input, setInput] = useState("")

  //Whenever the user types in the input, I want to change the state of the input to whatever has been typed
  const handleChange = (event) => {
    setInput(event.target.value)
  }

  //When the user submits the form, call addNewActivity() in the App component
  const handleSubmit = (event) => {
    event.preventDefault();
    addActivity(input)
    setInput("")
  }

  const handleThemeClick = () => {
    changeTheme()
  }


  return (
    <div className="header" style={{backgroundImage: isLightTheme ? `url(${lightBackgroundImage})`: `url(${darkBackgroundImage})`}}>
      <div className="title">
        <h1>TODO</h1>
        <img
        onClick={handleThemeClick}
        src={isLightTheme ? moon : sun}
        type="button"
        alt=""
        />
      </div>
      <div
      className="new-activity"
      style={{backgroundColor: isLightTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"}}>
        <div
        style={{border: isLightTheme ? "solid thin hsl(236, 33%, 92%)" : "solid thin hsl(233, 14%, 35%)"}}
        className="circle"
        >
        </div>
        <form onSubmit={handleSubmit}>
          <input
          style={{
            backgroundColor: isLightTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)",
            color: isLightTheme ? "hsl(235, 19%, 35%)" : "hsl(234, 39%, 85%)"
          }}
          placeholder="What's next to be done?"
          value={input}
          onChange={handleChange}
          />
        </form>
      </div>
    </div>
  )
}

export default Header
