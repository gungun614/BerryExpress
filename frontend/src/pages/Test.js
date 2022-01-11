import React, { useEffect, useState, useCallback } from "react";
import Select, { components } from 'react-select'

// const Input = props => <components.Input {...props} maxLength={5} />

const SearchBar = props => {
  const { handleChange, options, selectedOption, placeholder } = props;

  const [ showOptions, setShowOptions ] = useState(false);

  const handleInputChange = useCallback((typedOption) => {
    if (typedOption.length >= 5 ) {
      setShowOptions(true);
    }
    else {
      setShowOptions(false);
    }
  }, []);

  return(
    <Select 
      value={selectedOption} 
      options={ showOptions ? options : [] } 
      onChange={ handleChange }
      onInputChange = { handleInputChange }
      placeholder={placeholder}

      // components={{ Input }}
    />
  )
}

// *** HOW TO IMPLEMENT ***
const Test = () => {

  const [addressOpts, setAddressOpts] = useState([])
  const [address, setAddress] = useState(null)

  // Data Structure of address
  // {
  //   value: {
  //     zipcode: 00000,
  //     subdistrict: "ตำบล",
  //     district: "อำเภอ",
  //     province: "จังหวัด"
  //   },
  //   label: "ตำบล อำเภอ จังหวัด 00000"
  // }

  useEffect(() => {
    const jsonAddress = require('../json/thailand_address.json')
    const opts = jsonAddress.map(address => {
      return {
        value: address,
        label: `${address.subdistrict}, ${address.district}, ${address.province}, ${address.zipcode}`
      }
    })

    setAddressOpts(opts)
  }, [])

  const handleChange = (change) => {
    console.log(change)
    setAddress(change)
  }
  
  return (
    <div>
      {'This is test'}
      <SearchBar
        selectedOption={address}
        options={addressOpts}
        handleChange={handleChange}
        placeholder={`ค้นหาที่อยู่`}
      />
    </div>
  )
}

export default Test