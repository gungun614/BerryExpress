import React from "react"

const Button = (props) => {

    const { text, onClick, type } = props
    
    const handleClick = (event) => {
        event.preventDefault()
        onClick()
    }

    return <button type={type} onClick={handleClick}>{text}</button>
}

export default Button