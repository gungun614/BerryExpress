import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

import Input from '../widgets/Input'
import Label from '../widgets/Label'
import Button from '../widgets/Button'
import Icon from '../widgets/Icon'

import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";

import parcelService from "../services/parcel"

import './css/AddParcel.css'

const { re } = require('../utils/regex')
const { getMessageWarning } = require('../utils/warning')
const jsonAddress = require('../json/thailand_address.json')
const { getCost } = require('../utils/cost')
const { genReceipt } = require('../utils/receipt')

const AddParcel = () => {
  const history = useHistory()
  const [ parcels, setParcels ] = useState([])

  //-------------------------------------------------------------

  const [ modal, setModal ] = useState({
    editParcel: true,
    removeParcel: true,
    confirmSave: true,
    warningSender: true,
    backlog: true,
    background: true
  })

  const hideModal = (name) => {
    setModal({ ...modal, [name]: true, background: true })
    
  }

  const showModal = (name) => {
    setModal({ ...modal, [name]: false, background: false })
  }

  //-------------------------------------------------------------

  const [ keepIndex, setKeepIndex ] = useState(null)

  //-------------------------------------------------------------

  const onClickAddParcel = () => {
    const isCorrect = Object.values(messageReceiver).every((value) => value == '')

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

        const result = await parcelService.saveParcels(data)

        if (result.status == 200) {
          const receipt = await genReceipt(result.data)
          window.open('/receipt').document.write(receipt)
          console.log(`status ${result.status}: ok`)
          history.push("/staff")

        } else {
          console.log(`status ${result.status}: ${result.error}`)
        }

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
  isDisabled.selectSubdistrict = subdistricts.length <= 1 ? true : false

  //-------------------------------------------------------------

  return (
    <div className="page-container addParcel">

      <div className="header-section addParcel">
        <HeaderBar />
      </div>

      <div className="nav-section addParcel">
        <NavSideBar />
      </div>

      <div className="main-section addParcel">
            
        <div className="sender-block">
          <Label className="label-sender" text="ข้อมูลผู้ส่ง" fontWeight="bold" />

          <Label className="firstname-label-sender" text="ชื่อ" require={true} />
          <Input className="firstname-input-sender" type="text" value={sender.firstname} name="firstname" onChange={handleChangeSender} />          
          <Label className="firstname-invalid-sender" text={messageSender.firstname} fontSize="13px" color="red" />

          <Label className="lastname-label-sender" text="นามสกุล" require={true} />
          <Input className="lastname-input-sender" type="text" value={sender.lastname} name="lastname" onChange={handleChangeSender} />
          <Label className="lastname-invalid-sender" text={messageSender.lastname} fontSize="13px" color="red" />

          <Label className="nation-id-label-sender" text="เลขบัตรประชาชน" require={true} />
          <Input className="nation-id-input-sender" type="text" value={sender.nationId} name="nationId" onChange={handleChangeSender} length="13" />
          <Label className="nation-id-invalid-sender" text={messageSender.nationId} fontSize="13px" color="red" />

          <Label className="tel-label-sender" text="เบอร์โทรศัพท์" require={true} />
          <Input className="tel-input-sender" type="text" value={sender.tel} name="tel" onChange={handleChangeSender} length="10" />
          <Label className="tel-invalid-sender" text={messageSender.tel} fontSize="13px" color="red" />
        </div>

        <div className="receiver-block">
          <Label className="label-receiver" text="ข้อมูลผู้รับ" fontWeight="bold" />
          
          <Label className="firstname-label-receiver" text="ชื่อ" require={true} />
          <Label className="firstname-invalid-receiver" text={messageReceiver.firstname} color="red" />
          <Input className="firstname-input-receiver" type="text" value={receiver.firstname} name="firstname" onChange={handleChangeReceiver} />
          
          <Label className="lastname-label-receiver" text="นามสกุล" require={true} />
          <Label className="lastname-invalid-receiver" text={messageReceiver.lastname} color="red" />
          <Input className="lastname-input-receiver" type="text" value={receiver.lastname} name="lastname" onChange={handleChangeReceiver} />
          
          <Label className="tel-label-receiver" text="เบอร์โทร" require={true} />
          <Label className="tel-invalid-receiver" text={messageReceiver.tel} color="red" />
          <Input className="tel-input-receiver" type="text" value={receiver.tel} name="tel" onChange={handleChangeReceiver} length="10" />
          
          <Label className="home-no-label-receiver" text="บ้านเลขที่" require={true} />
          <Label className="home-no-invalid-receiver" text={messageReceiver.homeNo} color="red" />
          <Input className="home-no-input-receiver" type="text" value={receiver.homeNo} name="homeNo" onChange={handleChangeReceiver} />
          
          <Label className="village-no-label-receiver" text="หมู่" />
          <Label className="village-no-invalid-receiver" text={messageReceiver.villageNo} color="red" />
          <Input className="village-no-input-receiver" type="text" value={receiver.villageNo} name="villageNo" onChange={handleChangeReceiver} />
          
          <Label className="alley-label-receiver" text="ซอย" require={true} />
          <Label className="alley-invalid-receiver" text={messageReceiver.alley} color="red" />
          <Input className="alley-input-receiver" type="text" value={receiver.alley} name="alley" onChange={handleChangeReceiver} />
          
          <Label className="road-label-receiver" text="ถนน" require={true} />
          <Label className="road-invalid-receiver" text={messageReceiver.road} color="red" />
          <Input className="road-input-receiver" type="text" value={receiver.road} name="road" onChange={handleChangeReceiver} />
          
          <Label className="zipcode-label-receiver" text="รหัสไปรษณีย์" require={true} />
          <Label className="zipcode-invalid-receiver" text={messageReceiver.zipcode} color="red" />
          <Input className="zipcode-input-receiver" type="text" value={receiver.zipcode} name="zipcode" onChange={handleChangeReceiver} length="5" />
          
          <Label className="province-label-receiver" text="จังหวัด" require={true} />
          <Label className="province-invalid-receiver" text={messageReceiver.province} color="red" />
          <Input className="province-input-receiver" type="text" value={province} name="province" onChange={handleChangeReceiver} disabled={true}  />

          <Label className="district-label-receiver" text="เขต/อำเภอ" require={true} />
          <Label className="district-invalid-receiver" text={messageReceiver.district} color="red" />
          <div className="district-input-receiver">
            <select   
              id="select-district" 
              value={receiver.district}
              size={sizeSelect.district}
              disabled={isDisabled.selectDistrict}
              onChange={onChangeSelectDistrict}
            >
            { districts.map((item, index) => <option key={index} valeu={item.district}>{item.district}</option>) }
            </select>
          </div>
          
          <Label className="subdistrict-label-receiver" text="แขวง/ตำบล" require={true} />
          <Label className="subdistrict-invalid-receiver" text={messageReceiver.subdistrict} color="red" />
          <div className="subdistrict-input-receiver">
            <select 
              id="select-subdistrict"
              size={sizeSelect.subdistrict}
              disabled={isDisabled.selectSubdistrict}
              onChange={onChangeSelectSubdistrict}
            >
            { subdistricts.map((item, index) => <option key={index} valeu={item.subdistrict}>{item.subdistrict}</option> ) }
            </select>
          </div>

          <Label className="weight-label-receiver" text="น้ำหนัก (กรัม)" require={true} />
          <Label className="weight-invalid-receiver" text={messageReceiver.weight} color="red" />
          <Input className="weight-input-receiver" type="text" value={receiver.weight} name="weight" onChange={handleChangeReceiver}  />

          <Label className="cost-label-receiver" text="ค่าจัดส่ง" />
          <Label className="cost-value-receiver" text={receiver.cost} />
          <Label className="cost-unit-receiver" text="บาท" />

          <Button className="button-add-parcel-receiver" text="เพิ่มพัสดุ" onClick={onClickAddParcel} />
        </div>

        <div className="parcels-block">
          <div className="list-parcels">
            {
              parcels.map((parcel, index) => {
                return (
                  <div key={index} className={'item-parcel list-' + ( index % 2 == 0 ? 'even' : 'odd' )}>

                    <div className="detail-parcel">

                      <div className="parcel-line1 block-inline">
                        <Label className="label-parcel" text="ชื่อ" />
                        <Label className="data-parcel" text={parcel.firstname} />

                        <Label className="label-parcel" text="นามสกุล" />
                        <Label className="data-parcel" text={parcel.lastname} />

                        <Label className="label-parcel" text="เบอร์โทร" />
                        <Label className="data-parcel" text={parcel.tel} />
                      </div>

                      <div className="parcel-line2 block-inline">
                        <Label className="label-parcel" text="บ้านเลขที่" />
                        <Label className="data-parcel" text={parcel.homeNo} />

                        <Label className="label-parcel" text="หมู่" />
                        <Label className="data-parcel" text={parcel.villageNo} />

                        <Label className="label-parcel" text="ซอย" />
                        <Label className="data-parcel" text={parcel.alley} />
                      </div>

                      <div className="parcel-line3 block-inline">
                        <Label className="label-parcel" text="แขวง/ตำบล" />
                        <Label className="data-parcel" text={parcel.subdistrict} />

                        <Label className="label-parcel" text="เขต/อำเภอ" />
                        <Label className="data-parcel" text={parcel.district} />
                      </div>

                      <div className="parcel-line4 block-inline">
                        <Label className="label-parcel" text="จังหวัด" />
                        <Label className="data-parcel" text={parcel.province} />
                        
                        <Label className="label-parcel" text="รหัสไปรษณีย์" />
                        <Label className="data-parcel" text={parcel.zipcode} />
                      </div>

                      <div className="parcel-line5 block-inline">
                        <Label className="label-parcel" text="น้ำหนัก" />
                        <Label className="data-parcel" text={parcel.weight} />
                        <Label className="label-parcel" text="กรัม" />

                        <Label className="label-parcel" text="ค่าจัดส่ง" />
                        <Label className="data-parcel" text={parcel.cost} />
                        <Label className="label-parcel" text="บาท" />
                      </div>
                    
                    </div> 
                    
                    <div className="icon-parcel item-parcel">
                      <Icon className="bi-pencil-fill icon-edit-parcel" title="แก้ไข" onClick={() => onClickEditParcel(index)} />
                      <Icon className="bi-trash-fill icon-remove-parcel" title="ลบ" onClick={() => onClickRemoveParcel(index)} />
                    </div>

                  </div>  
                )
              })
            }
          </div>
          <Button className="button-save-parcels" text="บันทึก" onClick={onClickSave} disabled={buttonSave} />
        </div>

        <div className="modal-background" style={{ display: modal.background ? 'none' : 'block' }}></div>
          
        <div className="modal" style={{ display: modal.editParcel ? 'none' : 'block' }}>
          <div className='modal-content'>
            มีข้อมูลค้างในช่องผู้รับ
            <br/>
            หากต้องการแทนที่กรุณากด ยืนยัน
          </div>
          <div className="modal-button">
            <Button className="btn" text="ยืนยัน" onClick={onClickConfirmReplaceEdfitParcel} />
            <Button className="btn" text="ยกเลิก" onClick={onClickCancelReplaceEditParcel} />
          </div>
        </div>

        <div className="modal" style={{ display: modal.removeParcel ? 'none' : 'block' }}>
          <div className="modal-content">
            ต้องการลบรายการนี้หรือไม่
          </div>
          <div className="modal-button">
            <Button className="btn" text="ยืนยัน" onClick={onClickConfirmRemoveParcel} />
            <Button className="btn" text="ยกเลิก" onClick={onClickCancelRemoveParcel} />
          </div>
        </div>

        <div className="modal" style={{ display: modal.warningSender ? 'none' : 'block' }}>
          <div className="modal-content">
            กรุณาป้อนข้อมูลผู้ส่งให้ครบทุกช่อง
          </div>
          <div className="modal-button">
            <Button className="btn" text="ตกลง" onClick={onClickOKWarningSender} />
          </div>
        </div>

        <div className="modal" style={{ display: modal.backlog ? 'none' : 'block' }}>
          <div className="modal-content">
            มีข้อมูลที่ค้างในช่องผู้รับ
          </div>
          <div className="modal-button">
            <Button className="btn" text="ละทิ้ง" onClick={onClickIgnoreReceiver} />
            <Button className="btn" text="ทำรายการต่อ" onClick={onClickBackWard} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddParcel