import React, { useState } from "react";
import Input from "../widgets/Input";
import Label from "../widgets/Label";
import loginService from "../services/login"
import positionService from "../services/position";
import { useHistory 
} from "react-router-dom";
import logo from "../image/cherryLogo.svg"
import "./css/Login.css"

const Login = () => {

  const history = useHistory()
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginUser = await loginService.login({
        username: userInput.username,
        password: userInput.password
      })
      const userPosition = await positionService.findById(loginUser.positionId)
      sessionStorage.setItem('session', loginUser.id)
      
      if (loginUser && userPosition.name === "Admin") history.push("/admin")
      else if (loginUser && userPosition.name === "Staff") history.push("/staff")
      else if (loginUser && userPosition.name === "Postman") history.push("/postman")
    } catch (exception) {
      console.log(exception)
      setUserInput({
        username: '',
        password: ''
      })
    }

  }

  return (
    <div className="login-container login">
      <div className="login-center login">
        <div className="brand-section login">
          <img src={logo} alt="Logo" />
          <h1>Berry Express</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="username-section login">
            <Label text="Username" />
            <Input type="text" value={userInput.username} name="username" onChange={handleChange} />
          </div>
          <div className="password-section login">        
            <Label text="Password" />
            <Input type="password" value={userInput.password} name="password" onChange={handleChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login