import React, { useState } from 'react'
import Icon from '../widgets/Icon'
import Input from '../widgets/Input'
import Label from '../widgets/Label'
import Button from '../widgets/Button'

const SenderDetail = () => {

    const [ firstname, setFirstname ] = useState('')
    const [ lastname, setLastname ] = useState('')
    const [ nationID, setNationID ] = useState('')
    const [ tel, setTel ] = useState('')

    const handleChangeFirstname = (event) => setFirstname(event.target.value)
    const handleChangeLastname = (event) => setLastname(event.target.value)
    const handleChangeNationID = (event) => setNationID(event.target.value)
    const handleChangeTel = (event) => setTel(event.target.value)
    
    return (
        <div>
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
        </div>
    )
} 

export default SenderDetail