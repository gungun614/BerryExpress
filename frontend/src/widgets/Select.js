import React from "react"

const Select = (props) => {

    const { disabled, name, value, options, onChange, size, isDefault } = props

    if (isDefault) {
      options.splice(0, 0, {value: "", label: "-"})
    }
    return (
      <select disabled = {disabled} value={value} name={name} onChange={onChange} size={size}>
        {options.map(({value, label}, index) => <option key={index} value={value}>{label}</option>)}
      </select>
    )
}

export default Select 