import React, { useState } from "react"
import Select from "../widgets/Select";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import GetTablePosition from "../components/GetTablePosition"
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";

const GetPosition = () => {
  const testData = [
    {id : 1,position :'admin'},
    {id : 2,position :'admin'},
    {id : 3,position :'admin'},
    {id : 4,position :'admin'}
  ]
  const selectSearch = [
    {value : 0,label:"ทั้งหมด"},
    {value : 1,label:"id "},
    {value : 2,label:"ชื่อ"}
  ]
  const [searchBy,setSearchBy] = useState(selectSearch[0].value)
  const [searchBox,setSearchBox] = useState('')
      
  const onChangeSelect = (event) =>{
    setSearchBy(event.target.value)
  }
  const handleChangeSearchBox = (event) =>{
    setSearchBox(event.target.value) 
  }
  console.log(searchBox)
  const handleClickSearch = () =>{
    console.log(`searchBox=${searchBox}`)
    console.log(`searchBy=${searchBy}`)
  }

  return (
    <div>
      <HeaderBar />
      <NavSideBar />
    <Select 
        value={searchBy}
        name={"selectSearch"}
        options={selectSearch}
        onChange={onChangeSelect}
      />
    <Input
        value={searchBox} 
        onChange={handleChangeSearchBox}
      />
    <Button text="search" onClick = {handleClickSearch}/>
        <GetTablePosition data = {testData}/>

    </div>
  )
}

export default GetPosition