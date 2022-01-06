import React from "react"

const Input = (props) => {

    const { value, onChange, type, className } = props
    
    return <input className={className} type={type} value={value} onChange={onChange} />
}

export default Input