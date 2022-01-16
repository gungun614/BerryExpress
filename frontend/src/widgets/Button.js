import React from "react"

const Button = (props) => {

    const { text, onClick, type, isHide, disabled } = props
    
    const handleClick = (event) => {
        event.preventDefault()
        onClick()
    }

    const style = {
        cursor: 'pointer',
        display: isHide ? 'hide' : 'block'
    }

    return <button type={type} style={style} onClick={handleClick} disabled={disabled}>{text}</button>
}

export default Button