import React, { useState } from "react";
import NavSideBar from "../components/NavSideBar"
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import HeaderBar from "../components/HeaderBar";

const AddPosition = () => {

  const [userInput, setUserInput] = useState({
    position: "",
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
      <HeaderBar />
      <NavSideBar />
      {`Add Position`}
      <form onSubmit={handleSubmit}>
        <Label text="ตำแหน่งงาน" />
        <br />
        <Input type="text" value={userInput.position} name="position" onChange={handleChange} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default AddPosition 