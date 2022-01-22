import React, { useState } from "react";
import Button from "../widgets/Button";
import Input from "../widgets/Input";
import "./css/Home.css"
import logo from "../image/cherryLogo.svg"

const Home = () => {

  const [isInitial, setIsInitial] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleSearch = () => {
    setIsInitial(false)
    setSearchResult(mockingParcel)
  }

  const mockingState = {
    id: 1,
    name: "lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  }
  const mockingParcel = [
    mockingState, mockingState, mockingState, mockingState
  ]

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
          />
          <Button
            type={"button"} text={"ค้นหา"} onClick={handleSearch}
          />
        </div>
        
      </div>

      {
        !isInitial
        ? <div className="results-container">
            { searchResult 
              .map((state, index) => 
                <div key={index} className="result-section">
                  <h3>{state.id}</h3>
                  <h2>{state.name}</h2>
                  <p>{state.description}</p>
                </div>
              )
            }
          </div>
        : null

      }
      <footer>
      </footer>

      
    </div>
  )
}

export default Home