import React, { useState } from "react";
import Button from "../widgets/Button";
import Input from "../widgets/Input";
import Label from "../widgets/Label";
import "./styles/Home.css"
import logo from "../image/cherryLogo.svg"
import StateItem from '../components/StateItem'
import trackingHistoryService from '../services/trackingHistory'

const Home = () => {

  const [isInitial, setIsInitial] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [disableButton, setDisabledButton] = useState(true)

  const [messageNotFound, setMessageNotFound] = useState('')

  const handleChange = (event) => {
    setSearchText(event.target.value)
    const status = event.target.value.length < 14 ? true : false
    setDisabledButton(status)
  }

  const handleSearch = async () => {
    setMessageNotFound('')

    const result = await trackingHistoryService.findByTrackingNumber(searchText)
    
    if (result.length > 0) {
      setSearchResult(result)
      setIsInitial(false)
    } else {
      setSearchResult([])
      setIsInitial(true)
      setMessageNotFound('ไม่มีข้อมูลเลขอ้างอิงพัสดุในระบบ หรือเลขอ้างอิงพัสดุไม่ถูกต้อง')
    }
  }

  return (
    <div 
      className="home-container" 
    >
      <div 
        className="search-container" 
        // style={{ gridRow: isInitial? "1/3": "1/2" }}
        style={ isInitial
          ? { gridRow:"1/3", height:"90vh", justifyContent:"center" }
          : { gridRow:"1/2", height:"20vh" }
        }
      >
        <div className="brand-section">
          <img src={logo} alt="Logo" />
          <h1>Berry Express</h1>
        </div>
        <div className="search-section">
          <Input
            type="text"
            value={searchText}
            name="searchText"
            onChange={handleChange}
            length="14"
          />
          <Button
            type={"button"}
            text={"ค้นหา"}
            onClick={handleSearch}
            disabled={disableButton}
          />
        </div>
        <Label text={messageNotFound} color="gray" />
      </div>

      {
        !isInitial
        ? 
        <div className="results-container">
            { searchResult 
              .map((state, index) => 
                <div key={index} className="result-section">
                  <StateItem
                    state={state.id}
                    branch={state.branchName}
                    date={state.date}
                    time={state.time}
                  />
                </div>
              )
            }
          </div>
        : null
      }
      
      <footer></footer>
    </div>
  )
}

export default Home