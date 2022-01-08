import React, { useState } from "react"
import Label from "../widgets/Label"
import Input from "../widgets/Input"

const ConsigneeDetail = () => {

    const [ consigneeName, setConsigneeName ] = useState('')
    const [ consigneeLastName, setConsigneeLastName ] = useState('')
    const [ addressNumber, setAddressNumber ] = useState('')
    const [ canton, setCanton ] = useState('')
    const [ district, setDistrict ] = useState('') 
    const [ province, setProvince ] = useState('')
    const [ zipCode, setZipCode ] = useState('')
    const [ telConsignee, setTelConsignee ] = useState('')

    const handleChangeConsigneeName = (event) => setConsigneeName(event.target.value)
    const handleChangeConsigneeLastName = (event) => setConsigneeLastName(event.target.value)
    const handleChangeAddressNumber = (event) => setAddressNumber (event.target.value)
    const handleChangeCanton  = (event) => setCanton (event.target.value)
    const handleChangeDistrict = (event) => setDistrict(event.target.value)
    const handleChangeProvince = (event) => setProvince(event.target.value)
    const handleChangeZipCode  = (event) => setZipCode (event.target.value)
    const handleChangeTelConsignee  = (event) => setTelConsignee (event.target.value)

    return (
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
    )
}

    export default ConsigneeDetail