import React from "react"

const Button = (props) => {

    const { text, onClick, type, isHide } = props
    
    const handleClick = (event) => {
        event.preventDefault()
        onClick()
    }

    const style = {
        cursor: 'pointer',
        display: isHide  ? 'none': 'block'
    }

    return <button type={type} style={style} onClick={handleClick}>{text}</button>
}

export default Button