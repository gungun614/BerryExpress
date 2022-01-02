import React from "react"

const Input = (props) => {
    const { value, onChange, type } = props
    return <input type={type} value={value} onChange={onChange} />
}

export default Input