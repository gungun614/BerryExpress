import React, { useState } from "react";
import { useRouteMatch } from 'react-router-dom'
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import StateItem from "../components/StateItem"
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
//Services
import trackingHistoryService from "../services/trackingHistory"

const TrackingCards = (props) => {
  // console.log(sessionStorage.getItem('session'))
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
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    })
  }

  const handleSearch = async () =>{
    const data = await trackingHistoryService.findByTrackingNumber(userInput.search)
    data.length > 0 ? setTrackingNumber(data[0].trackingNo) : setTrackingNumber('')
    Array.isArray(data) ? setTrackingDatas(data) : setTrackingDatas([data])
  }

  const handleUpdate = async (event) =>{
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
  }

  return (
    <div>
      <HeaderBar />
      <NavSideBar />
        <Label text ="Berry Express" />
        <br/>
        <Input type ="text" value={userInput.search} name="search" onChange={handleChange}/>
        <Button text ="Search" onClick={handleSearch}/>
        <br/>
        <TrackingCards data = {trackingDatas}/>
        <div style = {{display : trackingDatas.length > 0 ? "block" : "none"}}>
          <div style = {{display : mainPath === "staff" ? "block" : "none"}}>
            <button name="กำลังนำส่ง" value={0} onClick={handleUpdate} >{"Update"}</button>
          </div>
          <div style = {{display : mainPath === "postman" ? "block" : "none"}} >
            <button name="กำลังนำส่ง" value={1} onClick={handleUpdate} >{"กำลังนำส่ง"}</button>
            <button name="จัดส่งสำเร็จ" value={2} onClick={handleUpdate} >{"จัดส่งสำเร็จ"}</button>
            <button name="หมายเหตุ" value={3} onClick={handleUpdate} >{"หมายเหตุ"}</button>
            <Input type ="text" value={userInput.remark} name="remark" onChange={handleChange}/>
          </div>
        </div>
    </div>
  )
}

export default UpdateParcelStatus
