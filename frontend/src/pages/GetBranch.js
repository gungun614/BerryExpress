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

// Styles
import "./css/GetBranch.css"

const GetBranch = () => {

  const GetTableBranch = (props) => {
    const { data , className } = props
    const rows = data.map((item) => {
      return (
        <tr key={item.id} className = {className}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.tel}</td>
          <td>{item.status}</td>
          <td><Icon onClick = {() => handleEditClick(item)} className = {"bi-pencil-fill"} /> </td>
        </tr>
      )
    })

    return (
    <table >
      <thead>
        <tr >
          <th>id</th>
          <th>ชื่อ</th>
          <th>เบอร์โทร</th>
          <th>สถานะ</th>
          <th></th>
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
  const [warnNote, setWarnNote] = useState('')

  const [branchTypes, setBranchTypes] = useState([])
  const [branchType, setBranchType] = useState({
    value: '',
    label: ''
  })
  const [addressOptions, setAddressOptions] = useState([])
  const [searchBy,setSearchBy] = useState('0')
  const [searchBox,setSearchBox] = useState('')
  const [tableData,setTableData] = useState([])
  const [isEditFormConfirm, setIsEditFormConfirm] = useState(true)
  const [isEditFormDisabled, setIsEditFormDisabled] = useState(true)
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
    return () => {}
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
    const searchData = Number(searchBox)
    let branchsInfo = ''

    if ( searchBox == '' ) {
      // console.log('Findall')
      branchsInfo = await branchService.findAll()
    } else if (Number.isInteger(searchData)) {
      // console.log('Number')
      branchsInfo = await branchService.findById(searchData)
    } else if (!Number.isInteger(searchData)) {
      // console.log('Non-Number')
      branchsInfo = await branchService.findByName(searchBox)
      
    }

    // switch(searchBy){
    //   case '0' :  branchsInfo = await branchService.findAll()
    //               break
    //   case '1' :  branchsInfo = await branchService.findById(searchBox)
    //               break
    //   case '2' :  branchsInfo = await branchService.findByName(searchBox)
    //               break
    //   default :   branchsInfo = await branchService.findAll()
    //               break
    // }

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
    setBranchType(branchTypes[editBranchData.branchTypeId - 1])
    setIsEditFormDisabled(false)
  }

  const handleSubmitEditBranch = async () => {
    editBranchData.name = `${branchTypes[(editBranchData.branchTypeId - 1)].label} ${editBranchData.name}`
    const response = await branchService.editById(editBranchData)
    console.log(response)
    await handleClickSearch()
    setIsEditFormDisabled(true)
    setIsEditFormConfirm(!isEditFormConfirm)
  }

  const handleCloseEditForm = () => {
    setIsEditFormDisabled(true)
  }

  const toggleConfirmEditForm = () => {
    setIsEditFormConfirm(!isEditFormConfirm)
  }

  const SearchBranchForm = () => {
    return (
      <div className="main-section getbranch">
        <h2>เรียกดูสาขา</h2>
          <div className="form-section getbranch">
            <div className="search-section getbranch">
              <Input
                value={searchBox} 
                // disabled={searchBy === '0' ? true : false}
                onChange={handleChangeSearchBox}
              />
              <Button text="search" onClick = {handleClickSearch}/>
            </div>
            <Label text={warnNote} />
            <div className="table-data getbranch">
              { tableData.length > 0 ?
              <GetTableBranch data = {tableData}/> :
              null
              }
          </div>
        </div>
      </div>
      )
    }

const EditBranchForm = () => {
  return (
  <div className="main-section addbranch">
  <div className="form-header addbranch">
    { isEditFormConfirm
      ? <h2>แก้ไขข้อมูลสาขา</h2>
      : <h2>ยืนยันการการแก้ไข</h2>
    }
  </div>
  <div className="form-section addbranch">
    <form>
      <div className="input-section addbranch">
        <div className="branchtype-section addbranch">
          <Label text="ประเภทสาขา" />
          <Select
            value={branchType.value}
            name="branchType"
            options={branchTypes}
            onChange={handleBranchTypeChange}
            disabled="disable"
          />
        </div >
        <div className="branchname-section addbranch">
          <Label text="ชื่อสาขา" />
          <Input 
            type="text" 
            value={editBranchData.name} 
            name="name"
            onChange={handleChangeEditBranchData} 
          />
        </div>
        <div className="address-section addbranch">
          <Label text="ที่อยู่สาขา" />
          <Input 
            type="text" 
            value={editBranchData.address} 
            name="address"
            onChange={handleChangeEditBranchData}
          />
        </div>
        <div className="mainaddress-section addbranch">
          <Label text="ที่อยู่ (ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์)" />
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
        </div>
        <div className="tel-section addbranch">
          <Label text="เบอร์โทร" />
          <Input 
            type="text" 
            value={editBranchData.tel} 
            name="tel"
            onChange={handleChangeEditBranchData} 
            onKeyPress={handleKeyPress} 
          />
        </div>
        <div className="date-section addbranch">
          <Label text="วันที่ก่อตั้ง" />
          <Input 
            type="date" 
            value={editBranchData.dateStarted} 
            name="dateStarted"
            onChange={handleChangeEditBranchData} 
          />
        </div>
      </div>
      <div className="button-section addbranch">
      <Button type={'button'} text={'ยกเลิก'} isHide = {!isEditFormConfirm} onClick = {handleCloseEditForm}  />
        <Button type={'button'} text={'บันทึก'} isHide = {!isEditFormConfirm} onClick = {toggleConfirmEditForm}  />
        <Button type={'button'} text={'แก้ไข'} isHide = {isEditFormConfirm} onClick = {toggleConfirmEditForm} />
        <div className="wide-button addbranch">
          <Button 
            type={'button'} 
            text={'ยืนยันการบันทึก'} 
            isHide = {isEditFormConfirm} 
            onClick={handleSubmitEditBranch}
          />
        </div>
        
      </div>
    </form>
  </div>
  </div>)
}

  return (
    <div className="page-container getbranch">
      <HeaderBar className="header-section getbranch" />
      <NavSideBar className="nav-section getbranch"/>
      { isEditFormDisabled ? SearchBranchForm() : EditBranchForm() }
    </div>
  )
}

export default GetBranch