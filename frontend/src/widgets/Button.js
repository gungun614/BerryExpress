import React from "react"

const Button = (props) => {
    const { text, onClick } = props
    const { type } = props || 'button'
    const handleClick = (event) => {
        event.preventDefault()
        onClick()
    }
    console.log('type button: ', type)
    return <button type={type} onClick={handleClick}>{text}</button>
}

export default Button