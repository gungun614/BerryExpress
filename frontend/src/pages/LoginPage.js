import React, { useState } from "react";
import Button from "../widgets/Button";
import Input from "../widgets/Input";
import Label from "../widgets/Label";

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

  const handleSubmit = () => {
    console.log(user)
  }

  return (
    <form>
      <Label text="Berry Express" />
      <br />
      <Label text="username" />
      <br />
      <Input type="text" value={user.username} name="username" onChange={handleChange} />
      <br />
      <Label text="password" />
      <br />
      <Input type="password" value={user.password} name="password" onChange={handleChange} />
      <Button type="submit" text={'Login'} onClick={handleSubmit} />
    </form>
  )
}

export default LoginPage