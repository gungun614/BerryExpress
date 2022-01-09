import React, { useState } from "react";
import Button from "../widgets/Button";
import Input from "../widgets/Input";
import Label from "../widgets/Label";
import loginService from "../services/login"
import positionService from "../services/position";
import { BrowserRouter as Router
  , useHistory 
} from "react-router-dom";

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
      

      console.log(loginUser)
      console.log(userPosition)
      if (loginUser && userPosition.name === "Admin") history.push("/admin")
      if (loginUser && userPosition.name !== "Admin") history.push("/staff")
    } catch (exception) {
      console.log(exception)
      setUserInput({
        username: '',
        password: ''
      })
    }

  }

  return (
      <form onSubmit={handleLogin}>
        <Label text="Berry Express" />
        <br />
        <Label text="username" />
        <br />
        <Input type="text" value={userInput.username} name="username" onChange={handleChange} />
        <br />
        <Label text="password" />
        <br />
        <Input type="password" value={userInput.password} name="password" onChange={handleChange} />
        <br />
        <button type="submit">Login</button>
      </form>
  )
}

export default Login