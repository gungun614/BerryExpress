import React, { useState } from "react"


// Components & Widgets
import Select from "../widgets/Select";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import GetTableBranch from "../components/GetTableBranch"
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";

// Services
import branchService from "../services/branch"


const GetBranch = () => {

  const dropDownList = [
    {value : 0,label:"ทั้งหมด"},
    {value : 1,label:"id "},
    {value : 2,label:"ชื่อ"}
  ]

  const [searchBy,setSearchBy] = useState('0')
  const [searchBox,setSearchBox] = useState('')
  const [tableData,setTableData] = useState([])

  const onChangeSelect = (event) =>{
    setSearchBy(event.target.value)
  }

  const handleChangeSearchBox = (event) =>{
    setSearchBox(event.target.value) 
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
    setTableData(Array.isArray(branchsInfo) ? branchsInfo : [branchsInfo] )
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
        onChange={handleChangeSearchBox}
        disabled={searchBy === '0' ? true : false}
      />
    <Button text="search" onClick = {handleClickSearch}/>
        <GetTableBranch data = {tableData}/>
    </div>
  )
}

export default GetBranch