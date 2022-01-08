import React from "react";

const Addparcel = () => {
  // mit

  
  // kang


  //nan
    const [ branchName, setBranchName ] = useState('1')
    const [ addressBranch, setAddressBranch ] = useState('2')
    const [ telBranch, setTelBranch ] = useState('3')
    const [ startDate, setStartDate ] = useState('4')
    const handleChangeBranchName = (event) => setBranchName(event.target.value)
    const handleChangeAddressBranch = (event) => setAddressBranch(event.target.value)
    
    const handleChangeTelBranch = (event) => setTelBranch(event.target.value)
    const handleChangeStartDate= (event) => setStartDate(event.target.value)


  // pppp


  return (
    <div>
      <div>
        {/* mit */}
      </div>
      <div>
        {/* kang */}
      </div>
      <div>
      <Label text = "ข้อมูลผู้รับ" />
            <br/>
            <Label text = "ชื่อ" />
            <Input type = "text" value = {consigneeName} onChange = {handleChangeConsigneeName} />  
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
            <Input type = "text" value = {telConsignee} onChange = {handleChangeTelConsignee} /> 
      </div>
      <div>
        {/* pppp */}
      </div>
    </div>
  )
}

export default Addparcel