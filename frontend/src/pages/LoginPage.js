import React, { useState } from "react";
import Button from "../widgets/Button";
import Input from "../widgets/Input";
import Label from "../widgets/Label";
import loginService from "../services/login"

const LoginPage = () => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(user)

    try {
      const loginUser = await loginService.login({
        username: user.username,
        password: user.password
      })
      console.log(loginUser)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Label text="Berry Express" />
      <br />
      <Label text="username" />
      <br />
      <Input type="text" value={user.username} name="username" onChange={handleChange} />
      <br />
      <Label text="password" />
      <br />
      <Input type="password" value={user.password} name="password" onChange={handleChange} />
      <br />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage