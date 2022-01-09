import React, { useState } from "react"
import Select from "../widgets/Select";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import GetTableTrackingState from "../components/GetTableTrackingState"

const GetTrackingState = () => {
  const testData = [
    {id : 1,status :'on going'},
    {id : 2,status :'on going'},
    {id : 3,status :'on going'},
    {id : 4,status :'on going'}
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
    console.log('searchBox = '+searchBox + '  ' + 'searchBy = '+searchBy )
  }
  return (
    <div>
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
        <GetTableTrackingState data = {testData}/>

    </div>
  )
}

export default GetTrackingState