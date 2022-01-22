import React, { useState } from "react";
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import StateItem from "../components/StateItem"
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
//Services
import trackingHistoryService from "../services/trackingHistory"
import staffService from "../services/staff"
import branchService from "../services/branch"

const TrackingCards = (props) => {
  // console.log(sessionStorage.getItem('session'))
  const {data} = props
  if (data.length > 0) {
    return data.map((track) => {
      return <StateItem key={track.id} state={track.itemStateId} branch={track.branchName} date={track.date} time={track.time}/>
    })
  } else {
    return null
  }
}

const UpdateParcelStatus = () => {
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

  const handleUpdate = async () =>{
    const response = await trackingHistoryService.addTracking(trackingNumber)
    console.log(response)
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
        <Button isHide = {trackingDatas.length > 0 ? false : true } text ="Update" onClick={handleUpdate} />
        
    </div>
  )
}

export default UpdateParcelStatus
