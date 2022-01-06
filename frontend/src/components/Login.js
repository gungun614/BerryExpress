import React, { useState } from "react"
import Label from "../widgets/Label"
import Button from "../widgets/Button"
import Input from "../widgets/Input"
import Icon from "../widgets/Icon"

const Login = () => {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ msgLogin, setMsgLogin ] = useState('')
    const [ msgColor, setMsgColor ] = useState('')

    const handleChangeUsername = (event) => setUsername(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)
    
    const handleChangeMsgLogin = () => {
        if (username === '' && password === '') {
            setMsgColor('red')
            setMsgLogin('please, enter username and password')
        } else if (username === '' || password === '') {
            setMsgColor('red')
            setMsgLogin(username === '' ? 'please, enter username' : 'please, enter password')
        } else if (username === 'admin' && password === '123') {
            setMsgColor('green')
            setMsgLogin('Login successful')
            setUsername('')
            setPassword('')
        } else {
            setMsgColor('red')
            setMsgLogin('username or password invalid')
        }
    }

    console.log(`username ${username} | password ${password}`)

    return (
        <div>
            <form>
                <Label text="Berry Express" fontSize="30px" color="red" fontWeight={'bold'} /><br/>
                <Label text="Username" /><br/>
                <Input type="text" value={username} onChange={handleChangeUsername} /><br/>
                <Label text="Password" /><br/>
                <Input type="password" value={password} onChange={handleChangePassword} /><br/>
                <Label text={msgLogin} color={msgColor} /><br/>
                <Button type={'submit'} text={'Login'} onClick={handleChangeMsgLogin} />
            </form>
        </div>
    )
}

export default Login