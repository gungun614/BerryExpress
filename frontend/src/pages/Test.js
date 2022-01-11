import React, { useEffect, useState } from "react";
import Select from 'react-select'

const Test = () => {

  const [addressOpts, setAddressOpts] = useState([])

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

  return (
    <div>
      {'This is test'}
      <Select 
        options={addressOpts}
        defaultInputValue="10110"
      />
    </div>
  )
}

export default Test