import React, { useState } from "react";
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import StateItem from "../components/StateItem"

const UpdateParcelStatus = () => {
  // mit
  const [userInput, setUserInput] = useState({
    search: ''
  })

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    })
  }


  return (
    <div>
        <Label text ="Berry Express" />
        <br/>
        <Input type ="text" value={userInput.search} name="search" onChange={handleChange}/>
        <Button text ="Search"/>
        <br/>
        <StateItem state={3} branch="กรุงเทพ" date="9 มกราคม 2565" time="01:00"/>
        
    </div>
  )
}

export default UpdateParcelStatus
