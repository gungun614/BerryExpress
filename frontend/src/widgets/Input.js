import React from "react"

const Select = (props) => {

    const { className, type, name, value, onChange } = props
    
    return <select
        className={className} 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
    />
}

export default Input