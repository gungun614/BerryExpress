import React, { useState } from "react";
import Button from "../widgets/Button";
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import StateItem from "../components/StateItem";
// css
import './css/Postman.css'
// service
import trackingHistoryService from "../services/trackingHistory"
import HeaderBar from "../components/HeaderBar";
import { Link } from "react-router-dom";
import MaterialIcon from "../icons/MaterialIcon";

const Postman = () => {

  const [textSearch, setTextSearch] = useState('')
  const [statusParcel, setStatusParcel] = useState([])
  const [remark, setRemark] = useState('')
  const [messageRemark, setMessageRemark] = useState('')

  const [hideButtonDelivering, setHideButtonDelivering] = useState(true)
  const [hideButtonRemark, setHideButtonRemark] = useState(true)
  const [hideButtonSuccess, setHideButtonSuccess] = useState(true)

  const handleChangeSearch = (event) => {
    if (event.target.value.length == 15) return
    setTextSearch(event.target.value.toUpperCase())
  } 

  const handleChangeRemark = (event) => {
    setRemark(event.target.value)
    setMessageRemark('')
  }

  const onClickSearch = async () => {
    const result = await trackingHistoryService.findByTrackingNumber(textSearch)
    setStatusParcel(result)
    buttonShowHide(result)
  }

  const requestAPI = async (trackingNo, itemStateId, remark = '') => {
    await trackingHistoryService.addTracking(trackingNo, itemStateId, remark)
    const data = await trackingHistoryService.findByTrackingNumber(textSearch)
    Array.isArray(data) ? setStatusParcel(data) : setStatusParcel([statusParcel])
    return data
  }

  const onClickDelivering = async () => {
    const data = await requestAPI(textSearch, 1)
    buttonShowHide(data)
  }

  const onClickRemark = async () => {
    if (remark.length == 0) {
      setMessageRemark('กรุณาใส่หมายเหตุ')
      return
    }
    const data = await requestAPI(textSearch, 3, remark)
    buttonShowHide(data)
    setRemark('')
    setMessageRemark('')
  }

  const onClickSuccess = async () => {
    const data = await requestAPI(textSearch, 2)
    buttonShowHide(data)
    setRemark('')
    setMessageRemark('')
  }

  const buttonShowHide = (datas) => {
    let lastItemStateId = datas[datas.length - 1].itemStateId

    if (lastItemStateId == 2) { // if success alredy, hide all update button.
      setHideButtonDelivering(true)
      setHideButtonRemark(true)
      setHideButtonSuccess(true)
    } else if (lastItemStateId == 4) { // if delivering, show remark button and success button.
      setHideButtonDelivering(true)
      setHideButtonRemark(false)
      setHideButtonSuccess(false)
    } else { // if remark or other above case, show delivering button.
      setHideButtonDelivering(false)
      setHideButtonRemark(true)
      setHideButtonSuccess(true)
    }
  }

  return (
    <div className="postman-page">
      <div className="header-section postman-page">
        <HeaderBar />
        <div className="logout-section postman-page">
          <Link to={"/login"} onClick={()=>{
            sessionStorage.removeItem('session')
          }}>
            <MaterialIcon iconName="logout" />
            {"Logout"}
          </Link>
        </div>
      </div>

      <form className="block-search postman-page">
        <Input className="input-search postman-page" type="text" value={textSearch} onChange={handleChangeSearch} />
        <Button className="button-search postman-page" type="submit" text="ค้นหา" onClick={onClickSearch} />
      </form>
      
      <div className="list-status-parcel">
        {
          statusParcel.map((track, index) => {

            return (
              <div className="item-status-parcel" key={index}>
                <StateItem 
                  key={track.id} 
                  state={track.itemStateId} 
                  branch={track.branchName} 
                  date={track.date} 
                  time={track.time} 
                  remark={track.remark}
                />
              </div>
            ) 
          })
        }
      </div>

      <div className="block-update-status-delivering postman-page" style={{ display: hideButtonDelivering ? 'none' : 'block' }} >
        <Button
          className="button-delivering postman-page" 
          text="อัพเดตสถานะนำจ่ายพัสดุ" 
          onClick={onClickDelivering}
          isHide={hideButtonDelivering}
        />
      </div>

      <div className="block-update-status-remark postman-page" style={{ display: hideButtonRemark ? 'none' : 'block' }} >
        <Label className="label-remark postman-page" text="หมายเหตุ" />
        <Label className="label-remark postman-page" text={messageRemark} color={ messageRemark.length > 0 ? 'red' : 'white'} />
        <Input className="input-remark postman-page" type="text" value={remark} onChange={handleChangeRemark} />
        <Button 
          className="button-delivery-remark postman-page" 
          text="อัพเดตสถานะหมายเหตุ" 
          onClick={onClickRemark}
          isHide={hideButtonRemark}
        />
      </div>

      <div className="block-update-status-success postman-page" style={{ display: hideButtonSuccess ? 'none' : 'block' }} >
        <Button
          className="button-delivery-success postman-page" 
          text="อัพเดตสถานะจัดส่งพัสดุสำเร็จ" 
          onClick={onClickSuccess}
          isHide={hideButtonSuccess}
        />
      </div>

    </div>
  )
}

export default Postman 