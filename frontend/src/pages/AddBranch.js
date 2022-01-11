import React, { useEffect, useState } from "react"
import Label from "../widgets/Label"
import Input from "../widgets/Input"
import Button from "../widgets/Button"
import NavSideBar from "../components/NavSideBar"
import HeaderBar from "../components/HeaderBar"
import SelectAddress from "../components/SelectAddress"
import Select from "../widgets/Select"
import branchService from "../services/branch"

const AddBranch = () => {

  // const [ branchName, setBranchName ] = useState('')
  // const [ addressBranch, setAddressBranch ] = useState('')
  // const [ telBranch, setTelBranch ] = useState('')
  // const [ startDate, setStartDate ] = useState('')
  // const handleChangeBranchName = (event) => setBranchName(event.target.value)
  // const handleChangeAddressBranch = (event) => setAddressBranch(event.target.value)

  // const handleChangeTelBranch = (event) => setTelBranch(event.target.value)
  // const handleChangeStartDate= (event) => setStartDate(event.target.value)
  const [branch, setBranch] = useState({
    name: "",
    address: "",
    mainAddress: {
      subdistrict: "",
      district: "",
      province: "",
      zipcode: "",
    },
    tel: "",
    dateStarted: "" 
  })

  const inputConstraints = {
    tel: {
      regex: /[0-9]/,
      length: 10
    },
    zipcode: {
      regex: /[0-9]/,
      length: 5
    }
  }

  const [branchTypes, setBranchTypes] = useState([])
  const [branchType, setBranchType] = useState({
    value: '',
    label: ''
  })
  const [thaiAddress, setThaiAddress] = useState([])
  const [isDisabledTitle, setIsDisabledTitle] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isDisabledButton, setIsDisabledButton] = useState(false)

  const [lastId, setLastId] = useState(0)

  useEffect(() => {
    // Setup Thai address
    const jsonAddress = require('../json/thailand_address.json')
    setThaiAddress(jsonAddress)

    // Setup branch types
    const jsonBranchTypes = require('../json/branch_types.json')
    const newBranchTypes = []
    for (const item of jsonBranchTypes) {
      const newBranchType = { value: item.id, label: item.name }
      newBranchTypes.push(newBranchType)
    }
    setBranchTypes(newBranchTypes)
    setBranchType(newBranchTypes[0])
  }, [])

  useEffect(() => {
    let isSubscribed = true
    branchService
      .getLastId()
      .then(id => {
        if (isSubscribed) {
          setLastId(id.maxId)
        }
      })
    
    // Cleanup()
    return () => { isSubscribed = false }
  }, [])



  const handleClickToggle = () => {
    setIsDisabledTitle(!isDisabledTitle)
    setIsDisabledButton(!isDisabledButton)
    setIsDisabled(!isDisabled)
  }

  const handleChange = (event) => {
    const [parent, child] = event.target.name.split(".")
    if (child) {
      setBranch({
        ...branch,
        [parent]: {
          ...branch[parent],
          [child]: event.target.value
        }
      })
    } else {
      setBranch({
        ...branch,
        [parent]: event.target.value
      })
    }
  }

  const handleBranchTypeChange = (event) => {
    const newBranchType = {
      value: event.target.value,
      label: branchTypes[event.target.value - 1].label
    }
    setBranchType(newBranchType)
    
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

  const handleSubmit = () => {
    const newName = `${branchType.label} ${branch.mainAddress.subdistrict} ${lastId + 1}`
    const newBranch = {
      ...branch,
      name: newName
    }
    setBranch(newBranch)
    console.log(newBranch)
  }

return (
  <div>
    <HeaderBar />
    <NavSideBar />
    <Label text="เพิ่มข้อมูลสาขา" isHide = {isDisabledTitle} />
    <Label text="ยืนยันการบันทึกข้อมูล" isHide = {!isDisabledTitle} />
    <br/>
    <Label text="ประเภทสาขา" />
    <Select
      value={branchType}
      name="branchType"
      options={branchTypes}
      onChange={handleBranchTypeChange}
      disabled={isDisabled}
    />
    <br/>
    <Label text="ที่อยู่สาขา" />
    <Input 
      type="text" 
      value={branch.address} 
      name="address"
      onChange={handleChange} 
      disabled={isDisabled} 
    />
    <br/>
    <SelectAddress 
      value={branch.mainAddress} 
      name="mainAddress" 
      options={thaiAddress} 
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      disabled={isDisabled} 
    />
    <br/>
    <Label text="เบอร์โทร" />
    <Input 
      type="text" 
      value={branch.tel} 
      name="tel"
      onChange={handleChange} 
      onKeyPress={handleKeyPress}
      disabled={isDisabled} 
    />
    <br/>
    <Label text="วันที่ก่อตั้ง" />
    <Input 
      type="date" 
      value={branch.dateStarted} 
      name="dateStarted"
      onChange={handleChange} 
      disabled={isDisabled} 
    />
    <br/>
    <Button type={'button'} text={'บันทึก'} isHide = {isDisabledButton} onClick = {handleClickToggle}  />
    <Button type={'button'} text={'แก้ไข'} isHide = {!isDisabledButton} onClick = {handleClickToggle} />
    <Button 
      type={'button'} 
      text={'ยืนยันการบันทึก'} 
      isHide = {!isDisabledButton} 
      onClick={handleSubmit}
    />

  </div>
  )
}

export default AddBranch