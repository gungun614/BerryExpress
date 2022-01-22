import React, { useEffect, useState } from "react"

// Components & Widgets
import Select from "../widgets/Select";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
// import GetTableBranch from "../components/GetTableBranch"
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
import Icon from "../widgets/Icon";
import Label from "../widgets/Label"
import SearchBarSelect from "../components/SearchBarSelect"

// Services
import branchTypeService from "../services/branchType"
import branchService from "../services/branch"


const GetBranch = () => {

  const GetTableBranch = (props) => {
    const {data} = props
    const rows = data.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.tel}</td>
          <td>{item.status}</td>
          <td><Icon onClick = {() => handleEditClick(item)} className = {"bi-pencil-fill"} /> </td>
        </tr>
      )
    })

    return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>ชื่อ</td>
          <td>เบอร์โทร</td>
          <td>สถานะ</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {
          rows
        }
      </tbody>
    </table>
    )
  }

  const dropDownList = [
    {value : 0,label:"ทั้งหมด"},
    {value : 1,label:"id "},
    {value : 2,label:"ชื่อ"}
  ]

  const [branchTypes, setBranchTypes] = useState([])
  const [branchType, setBranchType] = useState({
    value: '',
    label: ''
  })
  const [addressOptions, setAddressOptions] = useState([])
  const [searchBy,setSearchBy] = useState('0')
  const [searchBox,setSearchBox] = useState('')
  const [tableData,setTableData] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [editBranchData,setEditBranchData] = useState({
    id: "",
    branchTypeId: "",
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


  useEffect(() => {
    // Setup Thai address
    const jsonAddress = require('../json/thailand_address.json')
    const options = jsonAddress.map(address => {
      return {
        value: address,
        label: `${address.subdistrict}, ${address.district}, ${address.province}, ${address.zipcode}`
      }
    })
    setAddressOptions(options)

  }, [])


  // Fetch all branch types
  useEffect(() => {
    let isSubscribed = true
    branchTypeService
      .findAll()
      .then(items => {
        if (isSubscribed) {
          const newBranchTypes = []
          for (const item of items) {
            const newBranchType = { value: item.id, label: item.name }
            newBranchTypes.push(newBranchType)
          }
          setBranchTypes(newBranchTypes)
          setBranchType(newBranchTypes[0])
        }
      })
    
    // Cleanup()
    return () => {/* isSubscribed = false */}
  }, [])


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
  

  const onChangeSelect = (event) =>{
    setSearchBy(event.target.value)
  }

  const handleChangeSearchBox = (event) =>{
    setSearchBox(event.target.value) 
  }

  const handleChangeEditBranchData = (event) => {
    setEditBranchData({
      ...editBranchData,
      [event.target.name]: event.target.value
    })
  }

  const handleBranchTypeChange = (event) => {
    setBranchType(branchTypes[event.target.value - 1])
    setEditBranchData({
      ...editBranchData,
      branchTypeId : event.target.value
    })
  }

  const handleAddressChange = (change) => {
    setEditBranchData({
      ...editBranchData,
      mainAddress: change.value
    })
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

  const handleClickSearch = async () =>{
    let branchsInfo = ''
    switch(searchBy){
      case '0' :  branchsInfo = await branchService.findAll()
                  break
      case '1' :  branchsInfo = await branchService.findById(searchBox)
                  break
      case '2' :  branchsInfo = await branchService.findByName(searchBox)
                  break
      default :   branchsInfo = await branchService.findAll()
                  break
    }
    console.log(branchsInfo)
    if (Array.isArray(branchsInfo)){
      branchsInfo.sort((a, b) => {return a.id - b.id});
      setTableData(branchsInfo)
    } else {
      setTableData([branchsInfo])
    }
  }

  const handleEditClick = ( branchData ) => {
    let editBranchData = {}
    Object.assign(editBranchData , branchData)
    const sliceIndex = (editBranchData.name.indexOf(" ") + 1)
    editBranchData.name = editBranchData.name.slice(sliceIndex)
    setEditBranchData(editBranchData)
    setIsDisabled(false)
  }

  const handleSubmitEditBranch = async () => {
    editBranchData.name = `${branchTypes[(editBranchData.branchTypeId - 1)].label} ${editBranchData.name}`
    const response = await branchService.editById(editBranchData)
    console.log(response)
    await handleClickSearch()
    setIsDisabled(true)
  }

 
  return (
    <div>
      <HeaderBar />
      <NavSideBar />
      <Select 
        value={searchBy}
        name={"dropDownList"}
        options={dropDownList}
        onChange={onChangeSelect}
      />
      <Input
        value={searchBox} 
        disabled={searchBy === '0' ? true : false}
        onChange={handleChangeSearchBox}
      />
      <Button text="search" onClick = {handleClickSearch}/>
      <GetTableBranch data = {tableData}/>

      <div style = {{display : isDisabled ? "none" : "block"}}>
        <Label 
          text="แก้ไขข้อมูลสาขา" 
        />
        <br/>
        <Label text="ประเภทสาขา" />
        <Select
          value={branchType.value}
          name="branchType"
          options={branchTypes}
          onChange={handleBranchTypeChange}
          // disabled="disabled"
        />
        <Input 
          type="text" 
          value={editBranchData.name} 
          name="name"
          onChange={handleChangeEditBranchData} 
        />
        <br/>
        <Label text="ที่อยู่สาขา" />
        <Input 
          type="text" 
          value={editBranchData.address} 
          name="address"
          onChange={handleChangeEditBranchData} 
        />
        <br/>
        <SearchBarSelect
          options={addressOptions}
          handleChange={handleAddressChange}
          minLength={5}
          placeholder={`${editBranchData.subdistrict}, 
            ${editBranchData.district}, 
            ${editBranchData.province}, 
            ${editBranchData.zipcode}`
          }
        />
        <br/>
        <Label text="เบอร์โทร" />
        <Input 
          type="text" 
          value={editBranchData.tel} 
          name="tel"
          onChange={handleChangeEditBranchData} 
          onKeyPress={handleKeyPress} 
        />
        <br/>
        <Label text="วันที่ก่อตั้ง" />
        <Input 
          type="date" 
          value={editBranchData.dateStarted} 
          name="dateStarted"
          onChange={handleChangeEditBranchData} 
        />
        <br/>
        <Button 
          type={'button'} 
          text={'บันทึก'} 
          onClick = {handleSubmitEditBranch}  
        />
        {/* <Button 
          type={'button'} 
          text={'แก้ไข'} 
          // onClick = {handleClickToggle} 
        />
        <Button 
          type={'button'} 
          text={'ยืนยันการบันทึก'} 
          // onClick={handleSubmit}
        /> */}
      </div>

    </div>
  )
}

export default GetBranch