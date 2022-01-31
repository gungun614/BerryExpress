import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar"
import SearchBarSelect from "../components/SearchBarSelect";
import staffService from "../services/staff";
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import branchService from "../services/branch";
import positionService from "../services/position";
import Select from "../widgets/Select";
import helper from "../utils/helper";
import { useHistory } from "react-router-dom";
import "./css/GetStaff.css"

const GetStaff = () => {
  // Form States
  const formStates = ["Started", "Searched", "Edited", "Added"]
  const [formState, setFormState] = useState(formStates[0])
  const [isDisabledForm, setIsDisabledForm] = useState(true)
  
  // Options
  const [addressOptions, setAddressOptions] = useState([])
  const [branchOptions, setBranchOptions] = useState([])
  const [positionOptions, setPositionOptions] = useState([])

  // Staff
  const [staff, setStaff] = useState({
    firstname: "",
    lastname: "",
    citizenId: "",
    dateBirth: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    zipcode: "",
    tel: "",
    email: "",
    salary: "",
    dateStarted: "",
    branchId: 0,
    positionId: 0,
    username: "",
    password: "" 
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

  const [staffOptions, setStaffOptions] = useState([])

  const history = useHistory()

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

  useEffect(() => {
    let isSubscribed = true

    staffService
      .findAll()
      .then(staffs => {
        if (isSubscribed) {
          const newStaffOptions = staffs.map(staff => {
            return {
              value: staff,
              label: `${staff.username}: ${staff.firstname} ${staff.lastname}`
            }
          })
          setStaffOptions(newStaffOptions)
        }
      })
    
    branchService
      .findAll()
      .then(branches => {
        if (isSubscribed) {
          const newBranchOptions = branches.map(branch => {
            return { value: branch, label: branch.name }
          })
          setBranchOptions(newBranchOptions)
        }
      })
    
    
    
    return () => { isSubscribed = false }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setNewPositionOptions = async (positionIds) => {

    const positions = await positionService.findAll()
    const newPositionOptions = positions.map(position => {
      return { value: position.id, label: position.name }
    })
    
    const filteredPositionOptions = positionIds.map(id => {
      return newPositionOptions.find(option => option.value === id)
    })

    setPositionOptions(filteredPositionOptions)
  }

  const handleStaffOptionChange = async (change) => {
    setStaff(change.value)

    const selectedBranchId = change.value.branchId
    const selectedBranch = branchOptions.find(option => option.value.id === selectedBranchId).value

    const positionIds = helper.positionIdGenerator(selectedBranch.branchTypeId)
    await setNewPositionOptions(positionIds)
    // Set to 'Searched' stage
    setFormState(formStates[1])
  }

  const handleKeyPress = (event) => {
    const value = event.target.value
    const constraint = inputConstraints[event.target.name]
    if (!constraint.regex.test(event.key) || value.length >= constraint.length) {
      event.preventDefault()
    }
  }

  const handleChange = (event) => {
    setStaff({
      ...staff,
      [event.target.name]: event.target.value
    })
  }

  const handleAddressChange = (change) => {
    const address = change.value
    setStaff({
      ...staff,
      subdistrict: address.subdistrict,
      district: address.district,
      province: address.province,
      zipcode: address.zipcode
    })
  }

  const handleBranchChange = async (change) => {
    const selectedBranch = change.value

    

    const positionIds = helper.positionIdGenerator(selectedBranch.branchTypeId)
    await setNewPositionOptions(positionIds)  

    setStaff({
      ...staff,
      branchId: selectedBranch.id,
      positionId: positionIds[0]
    })

  }

  const handleEdit = () => {
    setIsDisabledForm(false)
    setFormState(formStates[2])
  }

  const handleSubmit = async () => {
    setFormState(formStates[3])
    try {
      const changedStaff = await staffService.change(staff)
      console.log(changedStaff)
      history.push("/admin")
    } catch (exception) {
      console.log(exception)
    }
  }

  
  return (
    <div className="page-container getstaff">
      <HeaderBar className="header-section getstaff" />
      <NavSideBar className="nav-section getstaff"/>

      <div className="main-section getstaff">
        <div className="form-header getstaff">
          <h2>{"เรียกดูพนักงาน"}</h2>

          <div className="search-select-staff getstaff">
            <SearchBarSelect
              options={staffOptions}
              handleChange={handleStaffOptionChange}
              minLength={3}
              placeholder={"ค้นหาพนักงาน"}
            />
          </div>
        </div>
        
        {
          staff.positionId === 0
          ? null
          : <div className="form-section getstaff"><form>
            <div className="input-section getstaff">
              <div className="firstname-section getstaff">
                <Label text="ชื่อ" />
                <Input 
                  disabled={isDisabledForm} 
                  type="text" 
                  value={staff.firstname} 
                  name="firstname" 
                  onChange={handleChange} 
                />
              </div>
              <div className="lastname-section getstaff">
                <Label text="นามสกุล" />
                <Input 
                  disabled={isDisabledForm} 
                  type="text" 
                  value={staff.lastname} 
                  name="lastname" 
                  onChange={handleChange} 
                />
              </div>
              <div className="id-section getstaff">
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
            <div className="birthday-section getstaff">
              <Label text="วันเกิด" />
              <Input 
                disabled={isDisabledForm} 
                type="date" 
                value={staff.dateBirth} 
                name="dateBirth" 
                onChange={handleChange} 
              />
            </div>
            <div className="tel-section getstaff">
              <Label text="เบอร์โทร" />
              <Input 
                disabled={isDisabledForm} 
                type="text" value={staff.tel} 
                name="tel" 
                onChange={handleChange} 
                onKeyPress={handleKeyPress} 
              />
            </div>
            <div className="email-section getstaff">
              <Label text="E-mail" />
              <Input 
                disabled={isDisabledForm} 
                type="email" 
                value={staff.email} 
                name="email" 
                onChange={handleChange} 
              />
            </div>
            <div className="address-section getstaff">
              <Label text="ที่อยู่" />
              <Input 
                disabled={isDisabledForm} 
                type="text" 
                value={staff.address} 
                name="address" 
                onChange={handleChange} 
              />
            </div>
            <div className="mainAddress-section getstaff">
              <Label text="ที่อยู่ (ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์)" />
              <SearchBarSelect 
                disabled={isDisabledForm}
                options={addressOptions}
                handleChange={handleAddressChange}
                minLength={5}
                placeholder={`${staff.subdistrict}, ${staff.district}, ${staff.province}, ${staff.zipcode}`}
              />
            </div>
            <div className="branch-section getstaff">
              <Label text="สาขา" />
              <SearchBarSelect 
                disabled={isDisabledForm }
                options={branchOptions}
                handleChange={handleBranchChange}
                minLength={5}
                placeholder={branchOptions
                  ? `${branchOptions.find(option => option.value.id === staff.branchId).label}`
                  // ? `heyyy`
                  : `ค้นหาที่อยู่`
                }
              />
            </div>
            <div className="position-section getstaff">
              <Label text="ตำแหน่งงาน" />
              <Select 
                disabled={isDisabledForm || !staff.branchId } 
                value={staff.positionId} 
                name="positionId" 
                options={positionOptions} 
                onChange={handleChange} 
              />
            </div>
            <div className="salary-section getstaff">
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
          <div className="button-section getstaff">{
            formState === formStates[1]
            ? <Button type={"button"} text={"แก้ไข"} onClick={handleEdit} />
            : null
            }
            {
              formState === formStates[2]
              ? <Button type={"submit"} text={"บันทึก"} onClick={handleSubmit} />
              : null
            }
          </div>
        </form>
      </div>
          }
    </div>
  </div>
  )
}

export default GetStaff