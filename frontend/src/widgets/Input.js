import React from "react"

const Input = (props) => {

    const { disabled, className, type, name, value, onChange, onKeyPress } = props
    
    return <input
        disabled={disabled}
        className={className} 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        onKeyPress={onKeyPress}
    />
}

export default Input