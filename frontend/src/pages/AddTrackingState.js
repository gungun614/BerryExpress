import React, { useState } from "react";
import NavSideBar from "../components/NavSideBar"
import Label from "../widgets/Label";
import Input from "../widgets/Input";

const AddTrackingState = () => {

  const [userInput, setUserInput] = useState({
    trackingState: "",
  })

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(userInput)
  }
  
  return (
    <div>
      <NavSideBar />
      {`Add tracking State`}
      <form onSubmit={handleSubmit}>
        <Label text="สถานะพัสดุ" />
        <br />
        <Input type="text" 
          value={userInput.trackingState} 
          name="trackingState" 
          onChange={handleChange} 
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default AddTrackingState