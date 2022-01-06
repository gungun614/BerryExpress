import React, { useState } from "react"
import Label from "../widgets/Label"
import Button from "../widgets/Button"
import Input from "../widgets/Input"

const AddStaffForm = () => {
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    birthDate: Date(),
    tel: "",
    email: "",
    address: "",
    branch: "",
    position: "",
    salary: ""
  })

  const handleClick = () => {
    console.log(staff)
  }
  const handleChange = (event) => {
    const newValue = event.target.value
    setStaff({
      ...staff,
      [event.target.name]: newValue
    })
  }

  return (
    <div>
      <form>
        <Label text="ชื่อ" />
        <Input type="text" value={staff.firstName} name="firstName" onChange={handleChange} />
        <Label text="นามสกุล" />
        <Input type="text" value={staff.lastName} name="lastName" onChange={handleChange} />
        <br/>
        <Label text="เลขบัตรประชาชน" />
        <Input type="number" value={staff.citizenId} name="citizenId" onChange={handleChange} />
        <br/>
        <Label text="วันเกิด" />
        <Input type="date" value={staff.birthDate} name="birthDate" onChange={handleChange} />
        <Label text="เบอร์โทร" />
        <Input type="number" value={staff.tel} name="tel" onChange={handleChange} />
        <Label text="E-mail" />
        <Input type="email" value={staff.email} name="email" onChange={handleChange} />
        <br/>
        <Label text="ที่อยู่" />
        <Input type="text" value={staff.address} name="address" onChange={handleChange} />

        <br/>
        <Button type={"submit"} text={"บันทึก"} onClick={handleClick} />
      </form>
    </div>

  )
}

export default AddStaffForm