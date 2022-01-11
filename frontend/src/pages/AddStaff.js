import NavSideBar from "../components/NavSideBar";
import React, { useEffect, useState } from "react"
import Label from "../widgets/Label"
import Button from "../widgets/Button"
import Input from "../widgets/Input"
import Select from "../widgets/Select"
import SelectAddress from "../components/SelectAddress"
import HeaderBar from "../components/HeaderBar";
import positionService from "../services/position";
import branchService from "../services/branch";

const AddStaff = () => {

  const [thaiAddress, setThaiAddress] = useState([])
  const [positions, setPositions] = useState([])
  const [branches, setBranches] = useState([])

  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    birthDate: "",
    tel: "",
    email: "",
    address: "",
    mainAddress: {
      zipcode: "",
      subdistrict: "",
      district: "",
      province: "" 
    },
    branch: "",
    position: "",
    salary: ""
  })

  const inputConstraints = {
    tel: {
      regex: /[0-9]/,
      length: 10
    },
    citizenId: {
      regex: /[0-9]/,
      length: 13
    },
    zipcode: {
      regex: /[0-9]/,
      length: 5
    }
  }

  const formStates = ["Started", "Added", "Committed"]
  const [formState, setFormState] = useState(formStates[0])
  const isDisabledForm = formState === formStates[0]? false: true

  // Get all thai address from JSON file
  useEffect(() => {
    const jsonAddress = require('../json/thailand_address.json')
    setThaiAddress(jsonAddress)
  }, [])

  // Fetch positions & branches from server
  useEffect(() => {
    let isSubscribed = true 
    // Fetch positions
    positionService
      .findAll()
      .then(arr => {
        if (isSubscribed) {
          const newPositions = []
          for (const item of arr) {
            const newPosition = { value: item.id, label: item.name }
            newPositions.push(newPosition)
          }
          setPositions(newPositions)
        }
      })
    
    // Fetch branches
    branchService
      .findAll()
      .then(items => {
        if (isSubscribed) {
          const newBranches = []
          for (const item of items) {
            const newBranch = { value: item.id, label: item.name }
            newBranches.push(newBranch)
          }
          setBranches(newBranches)
        }
      })

    // Need to be cleaned up, otherwise it will cause memory leak!
    return () => { isSubscribed = false }
  }, [])

  const getAllBranches = () => {
    return [
      { value: "branch 1", label: "สาขา 1"},
      { value: "branch 2", label: "สาขา 2"},
      { value: "branch 3", label: "สาขา 3"}
    ]
  }
  
  const handleSubmit = () => {
    if (formState !== formStates[2]) { 
      setFormState(formStates[formStates.indexOf(formState) + 1]) 
    }
    if (formState === formStates[1]) { 
      console.log("Completed!")
      console.log(staff) 
      // TODO: enable modal box
    }
  }
  const handleEdit = () => {
    if (formState !== formStates[0]) { 
      setFormState(formStates[formStates.indexOf(formState) - 1])
    }
  }

  const handleChange = (event) => {
    const [parent, child] = event.target.name.split(".")
    if (child) {
      setStaff({
        ...staff,
        [parent]: {
          ...staff[parent],
          [child]: event.target.value
        }
      })
    } else {
      setStaff({
        ...staff,
        [parent]: event.target.value
      })
    }
  }

  const handleKeyPress = (event) => {
    const [, child] = event.target.name.split(".")
    const value = event.target.value
    let constraint = ""
    if (child) {
      constraint = inputConstraints[child]
    } else {
      constraint = inputConstraints[event.target.name]
    }
    if (!constraint.regex.test(event.key) || value.length >= constraint.length) {
      event.preventDefault()
    }
  }

  return (
    <div>
      <HeaderBar />
      <NavSideBar />
      <form>
        <Label text="ชื่อ" />
        <Input 
          disabled={isDisabledForm} 
          type="text" 
          value={staff.firstName} 
          name="firstName" 
          onChange={handleChange} 
        />
        <Label text="นามสกุล" />
        <Input 
          disabled={isDisabledForm} 
          type="text" 
          value={staff.lastName} 
          name="lastName" 
          onChange={handleChange} 
        />
        <br/>
        <Label text="เลขบัตรประชาชน" />
        <Input 
          disabled={isDisabledForm} 
          type="text" 
          value={staff.citizenId} 
          name="citizenId" 
          onChange={handleChange} 
          onKeyPress={handleKeyPress} 
        />
        <br/>
        <Label text="วันเกิด" />
        <Input 
          disabled={isDisabledForm} 
          type="date" 
          value={staff.birthDate} 
          name="birthDate" 
          onChange={handleChange} 
        />
        <Label text="เบอร์โทร" />
        <Input 
          disabled={isDisabledForm} 
          type="text" value={staff.tel} 
          name="tel" 
          onChange={handleChange} 
          onKeyPress={handleKeyPress} 
        />
        <Label text="E-mail" />
        <Input 
          disabled={isDisabledForm} 
          type="email" 
          value={staff.email} 
          name="email" 
          onChange={handleChange} 
        />
        <br/>
        <Label text="ที่อยู่" />
        <Input 
          disabled={isDisabledForm} 
          type="text" 
          value={staff.address} 
          name="address" 
          onChange={handleChange} 
        />
        <SelectAddress 
          disabled={isDisabledForm} 
          value={staff.mainAddress} 
          name="mainAddress" 
          options={thaiAddress} 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <br/>
        <Label text="สาขา" />
        <Select 
          disabled={isDisabledForm} 
          value={staff.branch} 
          name="branch" 
          options={branches} 
          onChange={handleChange} 
        />
        <Label text="ตำแหน่งงาน" />
        <Select 
          disabled={isDisabledForm} 
          value={staff.position} 
          name="position" 
          options={positions} 
          onChange={handleChange} 
        />
        <Label text="เงินเดือน" />
        <Input 
          disabled={isDisabledForm} 
          type="number" 
          value={staff.salary} 
          name="salary" 
          onChange={handleChange} 
        />
        <br/>
        { 
          formState !== formStates[2]
          ? <Button type={"submit"} text={"บันทึก"} onClick={handleSubmit} />
          : null 
        }
        { 
          formState === formStates[1]
          ? <Button type={"button"} text={"แก้ไข"} onClick={handleEdit} />
          : null 
        }

      </form>
    </div>
  )
}

export default AddStaff
