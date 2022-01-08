import React, { useState } from "react"
import Label from "../widgets/Label"
import Input from "../widgets/Input"

const AddBranch = () => {
  
    const [ branchName, setBranchName ] = useState('')
    const [ addressBranch, setAddressBranch ] = useState('')
    const [ telBranch, setTelBranch ] = useState('')
    const [ startDate, setStartDate ] = useState('')
    const handleChangeBranchName = (event) => setBranchName(event.target.value)
    const handleChangeAddressBranch = (event) => setAddressBranch(event.target.value)
    
    const handleChangeTelBranch = (event) => setTelBranch(event.target.value)
    const handleChangeStartDate= (event) => setStartDate(event.target.value)



  return (
    <div>
    <Label text="ชื่อสาขา" />
    <Input type = "text" value = {branchName} onChange = {handleChangeBranchName} /> 
    <br/>
    <Label text="ที่อย่สาขา" />
    <Input type = "text" value = {addressBranch} onChange = {handleChangeAddressBranch} />
    <br/>
    <Label text="เบอร์โทร"  />
    <Input type = "text" value = {telBranch} onChange = {handleChangeTelBranch} />
    <br/>
    <Label text="วันที่ก่อตั้ง" />
    <Input type = "text" value = {startDate} onChange = {handleChangeStartDate} />
 </div>
      
  )
  
}

export default AddBranch