import React from "react"

const Select = (props) => {

    const { disabled, name, value, options, onChange } = props

    return (
      <select disabled = {disabled}  value={value} name={name} onChange={onChange}>
        {options.map(({value, label}, index) => <option key={index} value={value}>{label}</option>)}
      </select>
    )
}

export default Select 