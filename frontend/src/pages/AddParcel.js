import React, { useState } from 'react'
import Input from '../widgets/Input'
import Label from '../widgets/Label'
import Button from '../widgets/Button'
import Icon from '../widgets/Icon'

import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
// import parcelService from "../services/parcel"
import './styles/AddParcel.css'
const { re } = require('../utils/regex')
const { getMessageWarning } = require('../utils/warning')
const jsonAddress = require('../json/thailand_address.json')
const { getCost } = require('../utils/cost')
const { genReceipt } = require('../utils/receipt')

// if (sessionStorage.getItem('username')[sessionStorage.getItem('username').length] != '1') window.location.replace("https://youtube.com")

const AddParcel = () => {
  console.log(sessionStorage.getItem('username'))
  const [ parcels, setParcels ] = useState([])

  //-------------------------------------------------------------

  const [ modal, setModal ] = useState({
    editParcel: true,
    removeParcel: true,
    confirmSave: true,
    warningSender: true,
    backlog: true
  })

  const hideModal = (name) => {
    setModal({ ...modal, [name]: true })
  }

  const showModal = (name) => {
    setModal({ ...modal, [name]: false })
  }

  //-------------------------------------------------------------

  const [ keepIndex, setKeepIndex ] = useState(null)

  //-------------------------------------------------------------

  const onClickAddParcel = () => {
    const isCorrect = Object.values(messageReceiver).every((value) => value == '')
    // const isData = Object.values(receiver).some((value) => value == '' || value == '0')
    // Object.values(receiver).some((value, name) => console.log(name))

    let isNotData = false
    for (const name in receiver) {
      if (name == 'villageNo') continue
      if (receiver[name] == '' || receiver[name] == '0') {
        isNotData = true
        break
      }
    }

    console.log('in click add parcel')
    if (isNotData) {
      console.log('if 1')
      let error = {}
      for (const name in receiver) {
        if (name == 'villageNo') continue
        if (receiver[name] == '' || receiver[name] == undefined) {
          error[name] = 'กรุณาป้อนข้อมูล'
          console.log('error name => ', name)
        }
      }
      console.log('error => ', error)
      setMessageReceiver({ ...messageReceiver, ...error })
    } else if (receiver.tel.length != 10) {
      console.log('if 2')

      setMessageReceiver({ ...messageReceiver, tel: 'เบอร์โทรศัพท์ต้องมี 10 หลักเท่านั้น' })
    } else if (isCorrect) {
      console.log('if 3')
      console.log('village => ', receiver.villageNo)
      if (receiver.villageNo == '') {
        setParcels([ ...parcels, { ...receiver, villageNo: '-' } ])
      } else {
        setParcels([ ...parcels, receiver ])
      }
      setReceiver({
        firstname: '',
        lastname: '',
        homeNo: '',
        villageNo: '',
        alley: '',
        road: '',
        subdistrict: '',
        district: '',
        province: '',
        zipcode: '',
        tel: '',
        weight: '',
        cost: '0'
      })
      unDisabledButtonSave()
    } else {

    }
  }

  //-------------------------------------------------------------


  const onClickEditParcel = (index) => {
    const isCorrect = Object.values(receiver).every((value) => value == '' || value == '0')
    if (isCorrect) {
      handleEditParcel(index)
    } else {
      showModal('editParcel')
      setKeepIndex(index)
    }
  }

  const handleEditParcel = (index) => {
    let temp = parcels[index]
    console.log('before temp => ', temp)
    temp.district = ''
    temp.subdistrict = ''
    console.log('after temp => ', temp)

    setReceiver(temp)
    // setReceiver({ ...receiver, district: '', subdistrict: '' })
    parcels.splice(index, 1)
    setParcels([ ...parcels ])
    if (parcels.length == 0) disabledButtonSave()
  }

  const onClickConfirmReplaceEdfitParcel = () => {
    handleEditParcel(keepIndex)
    onClickCancelReplaceEditParcel()
  }

  const onClickCancelReplaceEditParcel = () => {
    hideModal('editParcel')
    setKeepIndex(null)
  }

  //-------------------------------------------------------------

  const onClickRemoveParcel = (index) => {
    showModal('removeParcel')
    setKeepIndex(index)
  }

  const onClickConfirmRemoveParcel = () => {
    parcels.splice(keepIndex, 1)
    setParcels([ ...parcels ])
    if (parcels.length == 0) disabledButtonSave()
    onClickCancelRemoveParcel()
  }

  const onClickCancelRemoveParcel = () => {
    hideModal('removeParcel')
    setKeepIndex(null)
  }

  //-------------------------------------------------------------

  const onClickOKWarningSender = () => {
    hideModal('warningSender')
  }

  //-------------------------------------------------------------

  const onClickIgnoreReceiver = () => {
    setReceiver({
      firstname: '',
      lastname: '',
      homeNo: '',
      villageNo: '',
      alley: '',
      road: '',
      subdistrict: '',
      district: '',
      province: '',
      zipcode: '',
      tel: '',
      weight: '',
      cost: '0'
    })
    onClickBackWard()
  }

  const onClickBackWard = () => {
    hideModal('backlog')
  }

  //-------------------------------------------------------------

  const [ buttonSave, setButtonSave ] = useState(true)

  const onClickSave = async () => {
    const isDataSender = Object.values(sender).every((value) => value != '')
    const isDataReceiver = Object.values(receiver).every((value) => value == '' || value == '0' )
    const isDataParcels = parcels.length > 0 ? true : false

    const isCorrectSender = Object.values(messageSender).every((value) => value == '')
    const isCorrectReceiver = Object.values(messageReceiver).every((value) => value == '')

    if (isDataSender && isDataReceiver && isDataParcels && isCorrectSender && isCorrectReceiver) {
      
      if (sender.nationId.length != 13) {
        setMessageSender({ ...messageSender, nationId: 'เลขบัตรประชาชนต้องมี 13 หลักเท่านั้น' })
      } else if (sender.tel.length != 10) {
        setMessageSender({ ...messageSender, tel: 'เบอร์โทรศัพท์ต้องมี 10 หลักเท่านั้น' })
      } else {
        console.log('save save save')
        const data = {
          sender: sender,
          parcels: parcels,
          staffId: sessionStorage.getItem('session')
        }
        // const data = { data: 'test request !!!' }
        // console.log(typeof parcelService)
        // const result = parcelService.saveParcels(data).then(result => result)
        // console.log('result api = ', result)
        // const result = await parcelService.saveParcels(data)
        // console.log(result)
        // window.open("https://youtube.com", "_blank")
        console.log('test')
        const receipt = await genReceipt('kang.')
        // console.log(receipt)
        // window.open('/receipt')
        // window.open('/receipt/:data')
        // const myWindow = 
        window.open('/receipt').document.write(receipt.toString())
        // myWindow.open('/receipt')
        // window.location.href = "http://localhost:3000/receipt";
        // window.open('http://localhost:3000/receipt')
        // myWindow.document.write(<input type="text" />);
        // myWindow.document.write(receipt.toString());

      }

    } else if (!isDataSender) {
      showModal('warningSender')
    } else if (!isDataReceiver) {
      showModal('backlog')
    }
  }

  const disabledButtonSave = () => {
    setButtonSave(true)
  }

  const unDisabledButtonSave = () => {
    setButtonSave(false)
  }

  //-------------------------------------------------------------

  const [ messageSender, setMessageSender ] = useState({
    nationId: '',
    firstname: '',
    lastname: '',
    tel: ''
  })

  const [ messageReceiver, setMessageReceiver ] = useState({
    firstname: '',
    lastname: '',
    homeNo: '',
    villageNo: '',
    alley: '',
    road: '',
    subdistrict: '',
    district: '',
    province: '',
    zipcode: '',
    tel: '',
    weight: '',
    cost: ''
  })

  //-------------------------------------------------------------

  const [ sender, setSender ] = useState({
    nationId: '',
    firstname: '',
    lastname: '',
    tel: ''
  })

  const handleChangeSender = (event) => {
    const name = event.target.name
    const value = event.target.value
    const isValid = re[name].test(value)
    if (isValid) {
      setMessageSender({ ...messageSender, [name]: '' })
    } else {
      const message = getMessageWarning(name)
      setMessageSender({ ...messageSender, [name]: message })
    }
    setSender({ ...sender, [name]: value })
  }

  //-------------------------------------------------------------

  const [ receiver, setReceiver ] = useState({
    firstname: '',
    lastname: '',
    homeNo: '',
    villageNo: '',
    alley: '',
    road: '',
    subdistrict: '',
    district: '',
    province: '',
    zipcode: '',
    tel: '',
    weight: '',
    cost: '0'
  })

  const handleChangeReceiver = (event) => {
    const name = event.target.name
    const value = event.target.value
    const isValid = re[name].test(value)
    const cost = name == 'weight' ? getCost(event.target.value) : receiver.cost
    if (isValid) {
      setMessageReceiver({ ...messageReceiver, [name]: '' })
    } else {
      const message = getMessageWarning(name)
      setMessageReceiver({ ...messageReceiver, [name]: message })
    }
    setReceiver({ ...receiver, [name]: value, cost: cost })
  }

  //-------------------------------------------------------------

  const isDisabled = {
    inputProvince: true,
    selectDistrict: true,
    selectSubdistrict: true,
  }

  const sizeSelect = {
    district: 0,
    subdistrict: 0
  }

  //-------------------------------------------------------------

  const onChangeSelectDistrict = (event) => {
    setReceiver({ ...receiver, province: province, district: event.target.value })
    let elementSelectDistrict = document.querySelector('#select-district')
    elementSelectDistrict.removeAttribute('size')
    setMessageReceiver({ ...messageReceiver, province: '', district: '' })
  }

  const onChangeSelectSubdistrict = (event) => {
    setReceiver({ ...receiver, subdistrict: event.target.value })
    let elementSelectSubdistrict = document.querySelector('#select-subdistrict')
    elementSelectSubdistrict.removeAttribute('size')
    setMessageReceiver({ ...messageReceiver, subdistrict: '' })

  }

  //-------------------------------------------------------------

  const provinces = jsonAddress.filter((item) => {
    return receiver.zipcode == item.zipcode ? item.zipcode : ''
  })

  let province = ''
  if (provinces.length > 0) {
    province = provinces[0].province
  }
  
  let temp = ''
  let districts = provinces.filter((item) => {
    if (temp != item.district) {
      temp = item.district
      return item.district
    }
  })
  districts.unshift('')

  temp = ''
  let subdistricts = provinces.filter((item) => {
    if (receiver.district == item.district) {
      if (temp != item.subdistrict) {
        temp = item.subdistrict
        return item.subdistrict
      }
    }
  })
  subdistricts.unshift('')


  sizeSelect.district = districts.length
  isDisabled.selectDistrict = districts.length <= 1 ? true : false

  sizeSelect.subdistrict = subdistricts.length
  // if (subdistricts.length == 1) receiver.subdistrict = subdistricts[0].subdistrict
  isDisabled.selectSubdistrict = subdistricts.length <= 1 ? true : false

  //-------------------------------------------------------------

  return (

    <div className="grid-container">

      <div className="item-header">
        <HeaderBar />
      </div>

      <div className="item-sidebar">
        <NavSideBar />
      </div>

      <div className="item-main">

        <div style={{ display: 'flex', flexDirection: 'columns' }}>

          <div style={{ width: '50%' }}>
            
            <div className="sender-info">
              <Label text="ข้อมูลผู้ส่ง" fontWeight="bold" />
              <br/>
              <div className="block-item">
                <div>
                  <Label text="ชื่อ" require={true} style={{ display: 'inline' }}/>
                  <Label text={messageSender.firstname} color="red" style={{ display: 'inline' }} /><br/>
                  <Input type="text" value={sender.firstname} name="firstname" style={{ display: 'inline' }} onChange={handleChangeSender} />
                </div>
                <div>
                  <Label text="นามสกุล" require={true} />
                  <Label text={messageSender.lastname} color="red" /><br/>
                  <Input type="text" value={sender.lastname} name="lastname" onChange={handleChangeSender} />
                </div>
                
                {/* <br/> */}
                
              </div>
              
              <Label text="เลขบัตรประชาชน" require={true} />
              <Label text={messageSender.nationId} color="red" />
              <Input type="text" value={sender.nationId} name="nationId" onChange={handleChangeSender} length="13" />
              <br/>
              <Label text="เบอร์โทรศัพท์" require={true} />
              <Label text={messageSender.tel} color="red" /><br/>
              <Input type="text" value={sender.tel} name="tel" onChange={handleChangeSender} length="10" />
            </div>

            <hr/>

            <div className="modal-edit-parcel" style={{ display: modal.editParcel ? 'none' : 'block' }}>
              <div>
                มีข้อมูลค้างอยู่ในข้อมูลผู้รับ ต้องการแทนที่หรือไม่<br/>
                กด ยืนยัน เพื่อแทนที่ หรือ กด ยกเลิก เพื่อย้อนกลับ
              </div>
              <Button text="ยืนยัน" onClick={onClickConfirmReplaceEdfitParcel} />
              <Button text="ยกเลิก" onClick={onClickCancelReplaceEditParcel} />
              <hr/>
            </div>

            <div className="modal-remove-parcel" style={{ display: modal.removeParcel ? 'none' : 'block' }}>
              <div>
                ยืนยันการลบรายการ
              </div>
              <Button text="ยืนยัน" onClick={onClickConfirmRemoveParcel} />
              <Button text="ยกเลิก" onClick={onClickCancelRemoveParcel} />
              <hr/>
            </div>

            <div className="modal-warning-sender" style={{ display: modal.warningSender ? 'none' : 'block' }}>
              <div>
                กรุณาป้อนข้อมูลผู้ส่งให้ครบทุกช่อง
              </div>
              <Button text="ตกลง" onClick={onClickOKWarningSender} />
              <hr/>
            </div>

            <div className="modal-warning-backlog" style={{ display: modal.backlog ? 'none' : 'block' }}>
              <div>
                ไม่สามารถบันทึกข้อมูลได้<br/>
                เนื่องจากมีข้อมูลค้างอยู่ในช่องผู้รับ<br/>
                กดปุ่มละทิ้ง เพื่อยกเลิกข้อมูลที่ค้าง<br/>
                หรือ กดปุ่มย้อนกลับ เพื่อทำรายการเพิ่มเติม
              </div>
              <Button text="ละทิ้ง" onClick={onClickIgnoreReceiver} />
              <Button text="ย้อนกลับ" onClick={onClickBackWard} />
              <hr/>
            </div>

            <div className="receiver-info">
              <Label text="ข้อมูลผู้รับ" fontWeight="bold" />
              <br/>
              <Label text="ชื่อ" require={true} />
              <Label text={messageReceiver.firstname} color="red" /><br/>
              <Input type="text" value={receiver.firstname} name="firstname" onChange={handleChangeReceiver} />
              <br/>
              <Label text="นามสกุล" require={true} />
              <Label text={messageReceiver.lastname} color="red" /><br/>
              <Input type="text" value={receiver.lastname} name="lastname" onChange={handleChangeReceiver} />
              <br/>
              <Label text="เบอร์โทร" require={true} />
              <Label text={messageReceiver.tel} color="red" /><br/>
              <Input type="text" value={receiver.tel} name="tel" onChange={handleChangeReceiver} length="10" />
              <br/>
              <Label text="บ้านเลขที่" require={true} />
              <Label text={messageReceiver.homeNo} color="red" /><br/>
              <Input type="text" value={receiver.homeNo} name="homeNo" onChange={handleChangeReceiver} />
              <br/>
              <Label text="หมู่" />
              <Label text={messageReceiver.villageNo} color="red" /><br/>
              <Input type="text" value={receiver.villageNo} name="villageNo" onChange={handleChangeReceiver} />
              <br/>
              <Label text="ซอย" require={true} />
              <Label text={messageReceiver.alley} color="red" /><br/>
              <Input type="text" value={receiver.alley} name="alley" onChange={handleChangeReceiver} />
              <br/>
              <Label text="ถนน" require={true} />
              <Label text={messageReceiver.road} color="red" /><br/>
              <Input type="text" value={receiver.road} name="road" onChange={handleChangeReceiver} />
              <br/>
              <Label text="รหัสไปรษณีย์" require={true} />
              <Label text={messageReceiver.zipcode} color="red" /><br/>
              <Input type="text" value={receiver.zipcode} name="zipcode" onChange={handleChangeReceiver} length="5" />
              <br/>
              <Label text="จังหวัด" require={true} />
              <Label text={messageReceiver.province} color="red" /><br/>
              <Input type="text" value={province} name="province" onChange={handleChangeReceiver} disabled={true}  />
              <br/>
              <Label text="เขต/อำเภอ" require={true} />
              <Label text={messageReceiver.district} color="red" /><br/>
              <select 
                id="select-district" 
                value={receiver.district}
                size={sizeSelect.district} 
                style={{ width: '200px' }} 
                disabled={isDisabled.selectDistrict}
                onChange={onChangeSelectDistrict}
              >
              { districts.map((item, index) => <option key={index} valeu={item.district}>{item.district}</option>) }
              </select>
              <br/>
              <Label text="แขวง/ตำบล" require={true} />
              <Label text={messageReceiver.subdistrict} color="red" /><br/>
              <select
                id="select-subdistrict"
                size={sizeSelect.subdistrict} 
                style={{ width: '200px' }}
                disabled={isDisabled.selectSubdistrict}
                onChange={onChangeSelectSubdistrict}
              >
              { subdistricts.map((item, index) => <option key={index} valeu={item.subdistrict}>{item.subdistrict}</option> ) }
              </select>
              <br/>
              <Label text="น้ำหนัก (กรัม)" require={true} />
              <Label text={messageReceiver.weight} color="red" /><br/>
              <Input type="text" value={receiver.weight} name="weight" onChange={handleChangeReceiver}  />
              <br/>
              <Label text="ค่าจัดส่ง" />
              <Label text={receiver.cost} />
              <Label text="บาท" />
              <br/>
              <Button text="เพิ่มพัสดุ" onClick={onClickAddParcel} />
            </div>

          </div>
          
          <div style={{ width: '50%' }}>

            <div className="parcels-info">
            {
              parcels.map((parcel, index) => {
                return (
                  <div key={index}>
                    <Label text="ชื่อ" /> <Label text={parcel.firstname} />
                    <Label text="นามสกุล" /> <Label text={parcel.lastname} />
                    <Label text="เบอร์โทร" /> <Label text={parcel.tel} />
                    <br/>
                    <Label text="บ้านเลขที่" /> <Label text={parcel.homeNo} />
                    <Label text="หมู่" /> <Label text={parcel.villageNo} />
                    <Label text="ซอย" /> <Label text={parcel.alley} />
                    <br/>
                    <Label text="แขวง/ตำบล" /> <Label text={parcel.subdistrict} />
                    <Label text="เขต/อำเภอ" /> <Label text={parcel.district} />
                    <Label text="จังหวัด" /> <Label text={parcel.province} />
                    <br/>
                    <Label text="รหัสไปรษณีย์" /><Label text={parcel.zipcode} />
                    <Label text="น้ำหนัก" /> <Label text={parcel.weight} /><Label text="กิโลกรัม" />
                    <Label text="ค่าจัดส่ง" /> <Label text={parcel.cost} /><Label text="บาท" />
                    <br/>
                    <Icon className="bi-pencil-fill" title="แก้ไขรายการนี้" onClick={() => onClickEditParcel(index)} />
                    <br/>
                    <Icon className="bi-trash-fill" title="ลบรายการนี้" onClick={() => onClickRemoveParcel(index)} />
                    <hr/>
                  </div>  
                )
              })
            }
            </div>
            <Button className="btn-save" text="บันทึก" onClick={onClickSave} disabled={buttonSave} />
            
          </div>

        </div>

      </div>

    </div>
  )
}

export default AddParcel