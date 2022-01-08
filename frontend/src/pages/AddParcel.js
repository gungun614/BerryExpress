import React, { useState } from "react";
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import Icon from "../widgets/Icon";

const AddParcel = () => {
  // mit
  const [userInput, setUserInput] = useState({
    senderName: '',
    senderSurname: '',
    senderIdcard: '',
    senderAddress: ''
  })

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    })
  }
  
  // kang
  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ nationID, setNationID ] = useState('')
  const [ tel, setTel ] = useState('')

  const handleChangeFirstname = (event) => setFirstname(event.target.value)
  const handleChangeLastname = (event) => setLastname(event.target.value)
  const handleChangeNationID = (event) => setNationID(event.target.value)
  const handleChangeTel = (event) => setTel(event.target.value)

  // nan
  // const [ branchName, setBranchName ] = useState('1')
  // const [ addressBranch, setAddressBranch ] = useState('2')
  // const [ telBranch, setTelBranch ] = useState('3')
  // const [ startDate, setStartDate ] = useState('4')
  // const handleChangeBranchName = (event) => setBranchName(event.target.value)
  // const handleChangeAddressBranch = (event) => setAddressBranch(event.target.value)

  // const handleChangeTelBranch = (event) => setTelBranch(event.target.value)
  // const handleChangeStartDate= (event) => setStartDate(event.target.value)

  // pppp


  return (
    <div>
      <div>
        {/* mit */}
        <Label text ="ข้อมูลผู้ส่ง" />
        <br/>
        <Label text ="ชื่อ" />
        <Input type ="text" value={userInput.senderName} name="senderName" onChange={handleChange}/>
        <br/>
        <Label text ="นามสกุล" />
        <Input type ="text" value={userInput.senderSurname} name="senderSurname"  onChange={handleChange}/>
        <br/>
        <Label text ="เลขบัตรประชาชน" />
        <Input type ="text" value={userInput.senderIdcard} name="senderIdcard" onChange={handleChange} />
        <br/>
        <Label text ="เบอร์โทร" />
        <Input type ="text" value={userInput.senderAddress} name="senderAddress" onChange={handleChange} />
        <br/>
        <Button text ="เพิ่ม"/>
      </div>
      <div>
        {/* kang */}
        <hr/>
        <Label text="ชื่อ" />
        <Input type="text" value={firstname} onChange={handleChangeFirstname} />
        <br/>
        <Label text="นามสกุล" />
        <Input type="text" value={lastname} onChange={handleChangeLastname} />
        <br/>
        <Label text="เลขบัตรประชาชน" />
        <Input type="text" value={nationID} onChange={handleChangeNationID} />
        <br/>
        <Label text="เบอร์โทรศัพท์" />
        <Input type="text" value={tel} onChange={handleChangeTel} />
        <br/>
        <Icon className="bi-trash-fill" title="ลบ" />
        &nbsp;&nbsp;&nbsp;
        <Icon className="bi-pencil-fill" title="แก้ไข" />
        <hr/>
        <Button text="เพิ่มพัสดุ" />
        <hr/>
      </div>
      <div>
        {/* nan */}
        {/* <Label text = "ข้อมูลผู้รับ" />
        <br/>
        <Label text="ชื่อ" />
        <Input type="text" value={consigneeName} onChange = {handleChangeConsigneeName} />  
        <br/>
        <Label text = "นามสกุล" />
        <Input type = "text" value = {consigneeLastName} onChange = {handleChangeConsigneeLastName} /> 
        <br/>
        <Label text = "ที่อยู่" />
        <Input type = "text" value = {addressNumber} onChange = {handleChangeAddressNumber} /> 
        <br/>
        <Label text = "แขวง/ตำบล "/>
        <Input type = "text" value = {canton } onChange = {handleChangeCanton } /> 
        <br/>
        <Label text = "เขต/อำเภอ "/>
        <Input type = "text" value = {district} onChange = {handleChangeDistrict} /> 
        <br/>
        <Label text = "จังหวัด"/>
        <Input type = "text" value = {province} onChange = {handleChangeProvince} /> 
        <br/>
        <Label text = "รหัสไปรษณีย์ "/>
        <Input type = "text" value = {zipCode} onChange = {handleChangeZipCode} /> 
        <br/>
        <Label text = "เบอร์โทร "/>
        <Input type = "text" value = {telConsignee} onChange = {handleChangeTelConsignee} />  */}
      </div>
      <div>
        {/* pppp */}
      </div>
    </div>
  )
}

export default AddParcel
