import React, { useState } from "react"
import Label from "../widgets/Label"
import Input from "../widgets/Input"
import Button from "../widgets/Button"

const AddBranch = () => {
  
    const [ branchName, setBranchName ] = useState('')
    const [ addressBranch, setAddressBranch ] = useState('')
    const [ telBranch, setTelBranch ] = useState('')
    const [ startDate, setStartDate ] = useState('')
    const handleChangeBranchName = (event) => setBranchName(event.target.value)
    const handleChangeAddressBranch = (event) => setAddressBranch(event.target.value)
    
    const handleChangeTelBranch = (event) => setTelBranch(event.target.value)
    const handleChangeStartDate= (event) => setStartDate(event.target.value)

    const [ isTitle, setIsTitle ] = useState(false)
    const [ isButton, setIsButton ] = useState(false)
    const handleClickToggle = () => {
      setIsTitle(!isTitle)
      setIsButton(!isButton)
      setIsEdit(!isEdit)
    }
    const [ isEdit, setIsEdit ] = useState(false)

  return (
    <div>

  <Label text="เพิ่มข้อมูลสาขา" isHide = {isTitle} />
  <Label text="ยืนยันการบันทึกข้อมูล" isHide = {!isTitle} />
  <br/>
    <Label text="ชื่อสาขา" />
    <Input type = "text" value = {branchName} onChange = {handleChangeBranchName} disabled ={isEdit} /> 
    <br/>
    <Label text="ที่อย่สาขา" />
    <Input type = "text" value = {addressBranch} onChange = {handleChangeAddressBranch} disabled ={isEdit} />
    <br/>
    <Label text="เบอร์โทร"  />
    <Input type = "text" value = {telBranch} onChange = {handleChangeTelBranch} disabled ={isEdit} />
    <br/>
    <Label text="วันที่ก่อตั้ง" />
    <Input type = "text" value = {startDate} onChange = {handleChangeStartDate} disabled ={isEdit} />
    <br/>
    <Button type={'button'} text={'บันทึก'} isHide = {isButton} onClick = {handleClickToggle}  />
    <Button type={'button'} text={'แก้ไข'} isHide = {!isButton} onClick = {handleClickToggle} />
    <Button type={'button'} text={'ยืนยันการบันทึก'} isHide = {!isButton}/>
     
 </div>
      
  )
  
}

export default AddBranch