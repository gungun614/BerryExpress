import React, { useState } from "react"
import Label from "../widgets/Label"
import Button from "../widgets/Button"
import Input from "../widgets/Input"

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ msgLogin, setMsgLogin ] = useState('')

    const handleChangeUsername = (event) => setUsername(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)
    
    const handleChangeMsgLogin = () => {
        const pass = username === 'admin' && password === '123'
        setMsgLogin(pass ? 'Login successful' : 'username or password invalid')
    }

    console.log(`username ${username} | password ${password}`)
    return (
        <div>
            <form>
                <Label text="Berry Express" style={{fontSize: '30px', fontWeight: 'bold', color: 'red'}} /><br/>
                <Label text="Username" /><br/>
                <Input type="text" value={username} onChange={handleChangeUsername} /><br/>
                <Label text="Password" /><br/>
                <Input type="password" value={password} onChange={handleChangePassword} /><br/>
                <Label text={msgLogin} /><br/>
                <Button type={'submit'} text={'Login'} onClick={handleChangeMsgLogin} />
            </form>
        </div>
    )
}

export default Login