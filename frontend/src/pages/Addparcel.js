import React, { useState } from "react";
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";

const Addparcel = () => {
  // mit
  const [userInput, setUserInput] = useState({
    senderName: '',
    senderSurname: '',
    senderIdcard: '',
    senderAddress: ''
  })

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    })
  }
  
  // kang


  // nan


  // pppp


  return (
    <div>
      <div>
        {/* mit */}
        <Label text ="ข้อมูลผู้ส่ง" />
        <br/>
        <Label text ="ชื่อ" />
        <Input type ="text" value={userInput.senderName} name="senderName" onChange={handleChange}/>
        <br/>
        <Label text ="นามสกุล" />
        <Input type ="text" value={userInput.senderSurname} name="senderSurname"  onChange={handleChange}/>
        <br/>
        <Label text ="เลขบัตรประชาชน" />
        <Input type ="text" value={userInput.senderIdcard} name="senderIdcard" onChange={handleChange} />
        <br/>
        <Label text ="เบอร์โทร" />
        <Input type ="text" value={userInput.senderAddress} name="senderAddress" onChange={handleChange} />
        <br/>
        <Button text ="เพิ่ม"/>
      </div>
      <div>
        {/* kang */}
      </div>
      <div>
        {/* nan */}
      </div>
      <div>
        {/* pppp */}
      </div>
    </div>
  )
}

export default Addparcel