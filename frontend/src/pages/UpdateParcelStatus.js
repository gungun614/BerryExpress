import React, { useState } from "react";
import { useRouteMatch } from 'react-router-dom'
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import StateItem from "../components/StateItem"
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
// css
import './css/UpdateParcelStatus.css'
//Services
import trackingHistoryService from "../services/trackingHistory"

const TrackingCards = (props) => {
  
  const {data} = props
  if (data.length > 0) {
    return data.map((track) => {
      return <StateItem 
      key={track.id} 
      state={track.itemStateId} 
      branch={track.branchName} 
      date={track.date} 
      time={track.time} 
      remark={track.remark}/>
    })
  } else {
    return null
  }
}

const UpdateParcelStatus = () => {
  const path = useRouteMatch().path.substring(1)
  const [mainPath, subPath] = path.split('/')

  const [trackingDatas,setTrackingDatas] = useState([])
  const [trackingNumber,setTrackingNumber] = useState('')
  const [userInput, setUserInput] = useState({
    search: ''
  })

  const handleChange = (event) => {
    if (event.target.value.length == 15) return
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value.toUpperCase()
    })
  }

  const [disabledButtonUpdate, setDisabledButtonUpdate] = useState(false)
  const [messageProgress, setMessageProgress] = useState('')

  const handleSearch = async () =>{
    setMessageProgress('')
    const data = await trackingHistoryService.findByTrackingNumber(userInput.search)
    data.length > 0 ? setTrackingNumber(data[0].trackingNo) : setTrackingNumber('')
    Array.isArray(data) ? setTrackingDatas(data) : setTrackingDatas([data])
    setDisabledButtonUpdate(false)
  }

  const handleUpdate = async (event) =>{
    setMessageProgress(<div style={{ color: 'gray'}}>กำลังอัพเดตสถานะพัสดุ</div>)
    let postManState = 0
    switch (event.target.value) {
      case '0' : break;
      case '1' : postManState = 1 // กำลังนำส่ง
        break;
      case '2' : postManState = 2 // จัดส่งสำเร็จ
        break;
      case '3' : postManState = 3 // หมายเหตุ
        break;
      default : break;
    }
    
    await trackingHistoryService.addTracking( trackingNumber , postManState , userInput.remark )
    const data = await trackingHistoryService.findByTrackingNumber(trackingNumber)
    Array.isArray(data) ? setTrackingDatas(data) : setTrackingDatas([data])
    setDisabledButtonUpdate(true)
    setMessageProgress(<div style={{ color: 'green'}}>อัพเดตสถานะพัสดุเรียบร้อยแล้ว</div>)

  }

  return (
    <div className="page-container update-parcel-status">
      
      <HeaderBar className="header-section update-parcel-status" />
      <NavSideBar className="nav-section update-parcel-status" />

      <div className="main-section update-parcel-status">

        <h2 className="label-update-parcel-status update-parcel-status">
          อัพเดตสถานะพัสดุ
        </h2>

        <div className="block-search-update update-parcel-status">

          <form className="block-search update-parcel-status">
            <Input className="input-search update-parcel-status" type ="text" value={userInput.search} name="search" onChange={handleChange}/>
            <Button className="button-search update-parcel-status" type="submit" text ="ค้นหา" onClick={handleSearch}/>
          </form>

          <div className="block-message-progress update-parcel-status">
            <div className="message-progress update-parcel-status">
              {messageProgress}
            </div>
          </div>

          <div className="block-update update-parcel-status">
            <button 
              className="button-update update-parcel-status"
              name="กำลังนำส่ง"
              value={0}
              onClick={handleUpdate} 
              disabled={disabledButtonUpdate}
              style={{display : trackingDatas.length > 0 ? "block" : "none"}}
            >
              อัพเดตสถานะพัสดุ
            </button>
          </div>
          
        </div>

        <div className="block-list-parcel-status update-parcel-status">
          <div className="list-parcel-status update-parcel-status">
            {
              trackingDatas.map((track, index) => {
                return (
                  <div className="item-parcel-status update-parcel-status" key={index}>
                    <StateItem
                      key={index} 
                      state={track.itemStateId} 
                      branch={track.branchName} 
                      date={track.date} 
                      time={track.time} 
                      remark={track.remark
                    }/>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default UpdateParcelStatus
