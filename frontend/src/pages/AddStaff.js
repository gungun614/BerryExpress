import React, { useEffect, useState } from "react"
import Label from "../widgets/Label"
import Button from "../widgets/Button"
import Input from "../widgets/Input"
import Select from "../widgets/Select"
import SearchBarSelect from "../components/SearchBarSelect";
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";

import "./css/AddStaff.css"

import positionService from "../services/position";
import branchService from "../services/branch";

import helper from "../utils/helper";
import staffService from "../services/staff"
import { useHistory } from "react-router-dom"

const AddStaff = () => {

  const [positions, setPositions] = useState([])

  const [addressOptions, setAddressOptions] = useState([])
  const [positionOptions, setPositionOptions] = useState([{ value: null, label: "Please Select"}])
  const [branchOptions, setBranchOptions] = useState([])

  const formStates = ["Started", "Added", "Committed"]
  const [formState, setFormState] = useState(formStates[0])
  const isDisabledForm = formState === formStates[0]? false: true

  const history = useHistory()

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
    branch: 0,
    position: 0,
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
  }

  // Get all thai address from JSON file
  useEffect(() => {
    const jsonAddress = require('../json/thailand_address.json')
    const options = jsonAddress.map(address => {
      return {
        value: address,
        label: `${address.subdistrict}, ${address.district}, ${address.province}, ${address.zipcode}`
      }
    })
    setAddressOptions(options)
  }, [])

  // Fetch branches from server
  useEffect(() => {
    let isSubscribed = true 
    const newBranchOptions = []

    branchService
      .findAll()
      .then(items => {
        if (isSubscribed) {
          for (const item of items) {
            const newBranchOption = { value: item, label: item.name }
            newBranchOptions.push(newBranchOption)
          }
          setBranchOptions(newBranchOptions)
        }
      })

    positionService
      .findAll()
      .then(items => {
        if (isSubscribed) {
          setPositions(items)
        }
      })
    
    // Need to be cleaned up, otherwise it will cause memory leak!
    return () => { isSubscribed = false }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  const handleEdit = () => {
    if (formState !== formStates[0]) { 
      setFormState(formStates[formStates.indexOf(formState) - 1])
    }
  }

  const handleChange = (event) => {
    setStaff({
      ...staff,
      [event.target.name]: event.target.value
    })
  }

  const handleAddressChange = (change) => {
    setStaff({
      ...staff,
      mainAddress: change.value
    })
  }

  const handleBranchChange = (change) => {

    const selectedBranch = change.value

    

    const positionIds = helper.positionIdGenerator(selectedBranch.branchTypeId)
    const newPositionOptions = []
    newPositionOptions
      .push(...positionIds.map(id => {
        const position = positions.find(item => item.id === id)
        return {
          value: position.id,
          label: position.name
        }
      })
    )
    console.log(newPositionOptions)
    setPositionOptions(newPositionOptions)
    setStaff({
      ...staff,
      branch: selectedBranch.id,
      position: newPositionOptions[0].value
    })
  }

  const handleKeyPress = (event) => {
    const value = event.target.value
    const constraint = inputConstraints[event.target.name]
    if (!constraint.regex.test(event.key) || value.length >= constraint.length) {
      event.preventDefault()
    }
  }

  const handleSubmit = async () => {
    if (formState !== formStates[2]) { 
      setFormState(formStates[formStates.indexOf(formState) + 1]) 
    }
    if (formState === formStates[1]) { 
      console.log("Completed!")
      console.log(staff) 
      const today = new Date().toISOString().slice(0, 10)
      const count = await staffService
        .findBranchWithPositionCount(staff.branch, staff.position)
      const branchId = helper.pad(staff.branch, 3)
      const staffId = helper.pad(count.amount + 1, 4)
      const username = `${staff.position}${branchId}${staffId}`
      const newStaff = {
        firstname: staff.firstName,
        lastname: staff.lastName,
        citizenId: staff.citizenId,
        dateBirth: staff.birthDate,
        address: staff.address,
        subdistrict: staff.mainAddress.subdistrict,
        district: staff.mainAddress.district,
        province: staff.mainAddress.province,
        zipcode: staff.mainAddress.zipcode,
        tel: staff.tel,
        email: staff.email,
        salary: staff.salary,
        dateStarted: today,
        branchId: staff.branch,
        positionId: staff.position,
        username: username,
        password: username
      }
      console.log(newStaff)
      try {
        const addStaff = await staffService.add(newStaff)
        console.log(addStaff)
        history.push("/admin")
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div className="page-container addstaff">
      <HeaderBar className="header-section addstaff" />
      <NavSideBar className="nav-section addstaff" />
      <div className="main-section addstaff">
        <h2>เพิ่มพนักงาน</h2>
        <div className="form-section addstaff">
          <form>
            <div className="input-section addstaff">
              <div className="firstname-section addstaff">
              <Label text="ชื่อ" />
              <Input 
                disabled={isDisabledForm} 
                type="text" 
                value={staff.firstName} 
                name="firstName" 
                onChange={handleChange} 
              />
            </div>
            <div className="lastname-section addstaff">
              <Label text="นามสกุล" />
              <Input 
                disabled={isDisabledForm} 
                type="text" 
                value={staff.lastName} 
                name="lastName" 
                onChange={handleChange} 
              />
            </div>
            
            <div className="id-section addstaff">
              <Label text="เลขบัตรประชาชน" />
              <Input 
                disabled={isDisabledForm} 
                type="text" 
                value={staff.citizenId} 
                name="citizenId" 
                onChange={handleChange} 
                onKeyPress={handleKeyPress} 
              />
            </div>
            <div className="birthday-section addstaff">
              <Label text="วันเกิด" />
              <Input 
                disabled={isDisabledForm} 
                type="date" 
                value={staff.birthDate} 
                name="birthDate" 
                onChange={handleChange} 
              />
            </div>
            <div className="tel-section addstaff">
              <Label text="เบอร์โทร" />
              <Input 
                disabled={isDisabledForm} 
                type="text" value={staff.tel} 
                name="tel" 
                onChange={handleChange} 
                onKeyPress={handleKeyPress} 
              />
            </div>
            
            <div className="email-section addstaff">
              <Label text="อีเมล" />
              <Input 
                disabled={isDisabledForm} 
                type="email" 
                value={staff.email} 
                name="email" 
                onChange={handleChange} 
              />
            </div>
            <div className="address-section addstaff">
              <Label text="ที่อยู่" />
              <Input 
                disabled={isDisabledForm} 
                type="text" 
                value={staff.address} 
                name="address" 
                onChange={handleChange} 
              />
            </div>
            <div className="mainAddress-section addstaff">
              <Label text="ที่อยู่ (ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์)" />
              <SearchBarSelect 
                disabled={isDisabledForm}
                options={addressOptions}
                handleChange={handleAddressChange}
                minLength={5}
                placeholder={`ค้นหาที่อยู่`}
              />
            </div>
            
            <div className="branch-section addstaff"><Label text="สาขา" />
              <SearchBarSelect 
                disabled={isDisabledForm }
                options={branchOptions}
                handleChange={handleBranchChange}
                minLength={5}
                placeholder={`ค้นหาสาขา`}
              />
            </div>
            <div className="position-section addstaff">
              <Label text="ตำแหน่งงาน" />
              <Select 
                disabled={isDisabledForm || !staff.branch } 
                value={staff.position} 
                name="position" 
                options={positionOptions} 
                onChange={handleChange} 
              />
            </div>
            <div className="salary-section addstaff">
              <Label text="เงินเดือน" />
              <Input 
                disabled={isDisabledForm} 
                type="number" 
                value={staff.salary} 
                name="salary" 
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className="button-section addstaff">{ 
              formState !== formStates[2]
              ? <Button type={"submit"} text={"บันทึก"} onClick={handleSubmit} />
              : null 
            }
            { 
              formState === formStates[1]
              ? <Button type={"button"} text={"แก้ไข"} onClick={handleEdit} />
              : null 
            }
          </div>
        </form>
      </div>
        
    </div>
      
  </div>
)}

export default AddStaff
