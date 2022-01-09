import React from "react";
import Input from "../widgets/Input";
import Label from "../widgets/Label";
import Select from "../widgets/Select";

const SelectAddress = (props) => {

  const { disabled, value, name, options, onChange, onKeyPress } = props

  const filteredAddress = options
    .filter(address =>  
      value.zipcode === `${address.zipcode}` 
    )

  const provinces = filteredAddress
    .map(address => {
      return {
        value: address.province,
        label: address.province
      }
    })
    .filter((address, index, self) => {
      return index === self.findIndex((item) => (
        item.value === address.value && item.label === address.label
      ))
    })

  provinces.splice(0, 0, {value: "", label: "-"})

  const districts = filteredAddress
    .filter(address => 
      value.province === `${address.province}`
    )
    .map(address => {
      return {
        value: address.district,
        label: address.district
      }
    })
    .filter((address, index, self) => {
      return index === self.findIndex((item) => (
        item.value === address.value && item.label === address.label
      ))
    })
  districts.splice(0, 0, {value: "", label: "-"})

  const subdistricts = filteredAddress
    .filter(address => 
          value.district === `${address.district}`
        )
    .map(address => {
      return {
        value: address.subdistrict,
        label: address.subdistrict
      }
    })
    .filter((address, index, self) => {
      return index === self.findIndex((item) => (
        item.value === address.value && item.label === address.label
      ))
    })   
  subdistricts.splice(0, 0, {value: "", label: "-"})

  return (
    <div>
      <Label text="รหัสไปรษณีย์" />
      <Input
        disabled={disabled} 
        value={value.zipcode} 
        name={`${name}.zipcode`}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Label text="จังหวัด" />
      <Select 
        disabled={disabled}
        value={value.province}
        name={`${name}.province`}
        options={provinces}
        onChange={onChange}
      />
      <Label text="อำเภอ/เขต" />
      <Select 
         disabled={disabled}
        value={value.district}
        name={`${name}.district`}
        options={districts}
        onChange={onChange}
      />
      <Label text="ตำบล/แขวง" />
      <Select        
        disabled={disabled}
        value={value.subdistrict}
        name={`${name}.subdistrict`}
        options={subdistricts}
        onChange={onChange}
      />
    </div>
  )
}

export default SelectAddress