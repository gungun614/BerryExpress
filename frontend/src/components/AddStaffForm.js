import React, { useState } from "react"
import Label from "../widgets/Label"
import Button from "../widgets/Button"
import Input from "../widgets/Input"
import Select from "../widgets/Select"

const AddStaffForm = () => {
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    birthDate: "",
    tel: "",
    email: "",
    address: "",
    branch: "",
    position: "",
    salary: ""
  })

  const formStates = ["Started", "Added", "Committed"]
  const [formState, setFormState] = useState(formStates[0])
  let isDisabledForm = formState === formStates[0]? false: true

  const getAllBranches = () => {
    return [
      { value: "branch 1", label: "สาขา 1"},
      { value: "branch 2", label: "สาขา 2"},
      { value: "branch 3", label: "สาขา 3"}
    ]
  }
  
  const getAllPositions = () => {
    return [
      { value: "admin", label: "Admin"},
      { value: "staff1", label: "Staff 1"},
      { value: "staff2", label: "Staff 2"}
    ]
  }

  const handleSubmit = () => {
    if (formState !== formStates[2]) { setFormState(formStates[formStates.indexOf(formState) + 1]) }
    if (formState === formStates[1]) { 
      console.log("Completed!")
      console.log(staff) 
      // TODO: enable modal box
    }
  }
  const handleEdit = () => {
    if (formState !== formStates[0]) { setFormState(formStates[formStates.indexOf(formState) - 1])}
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
        <Input disabled={isDisabledForm} type="text" value={staff.firstName} name="firstName" onChange={handleChange} />
        <Label text="นามสกุล" />
        <Input disabled={isDisabledForm} type="text" value={staff.lastName} name="lastName" onChange={handleChange} />
        <br/>
        <Label text="เลขบัตรประชาชน" />
        <Input disabled={isDisabledForm} type="number" value={staff.citizenId} name="citizenId" onChange={handleChange} />
        <br/>
        <Label text="วันเกิด" />
        <Input disabled={isDisabledForm} type="date" value={staff.birthDate} name="birthDate" onChange={handleChange} />
        <Label text="เบอร์โทร" />
        <Input disabled={isDisabledForm} type="number" value={staff.tel} name="tel" onChange={handleChange} />
        <Label text="E-mail" />
        <Input disabled={isDisabledForm} type="email" value={staff.email} name="email" onChange={handleChange} />
        <br/>
        <Label text="ที่อยู่" />
        <Input disabled={isDisabledForm} type="text" value={staff.address} name="address" onChange={handleChange} />
        <br/>
        <Label text="สาขา" />
        <Select disabled={isDisabledForm} value={staff.branch} name="branch" options={getAllBranches()} onChange={handleChange} />
        <Label text="ตำแหน่งงาน" />
        <Select disabled={isDisabledForm} value={staff.position} name="position" options={getAllPositions()} onChange={handleChange} />
        <Label text="เงินเดือน" />
        <Input disabled={isDisabledForm} type="number" value={staff.salary} name="salary" onChange={handleChange} />

        <br/>
        { formState !== formStates[2]? <Button type={"submit"} text={"บันทึก"} onClick={handleSubmit} />: null }
        { formState === formStates[1]? <Button type={"button"} text={"แก้ไข"} onClick={handleEdit} />: null }

      </form>
    </div>
  )
}

export default AddStaffForm