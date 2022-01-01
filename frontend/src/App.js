import './App.css';
import Input from "./components/Input"
import Label from './components/Label';
import Button from './components/Button'
import React, { useState } from 'react';

const App = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onLoginSubmit = () => {
    console.log(`${username}, ${password}`)
  }

  return (
    <div>
      <Label value={"Username:"} />
      <Input type={"text"} name={"username"} value={username} onChange={handleUsernameChange}/>
      <Label value={"Password:"} />
      <Input type={"password"} name={"password"} value={password} onChange={handlePasswordChange}/>
      <Button label={"Submit"} click={onLoginSubmit} />
    </div>
  );
}

export default App;
