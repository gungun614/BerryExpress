import React, { useState } from "react";
import Label from "../widgets/Label";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import StateItem from "../components/StateItem"
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
//Services
import trackingHistoryService from "../services/trackingHistory"

const TrackingCards = (props) => {
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
    console.log(data)
    Array.isArray(data) ? setTrackingDatas(data) : setTrackingDatas([data])
  }

  const handleUpdate = async () =>{

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
        
    </div>
  )
}

export default UpdateParcelStatus
