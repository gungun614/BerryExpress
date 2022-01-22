import React, { useState, useCallback } from 'react';
import Select from 'react-select'

// const Input = props => <components.Input {...props} maxLength={5} />

// Search Bar that only start searching when you type with 5 or more charactors
const SearchBarSelect = (props) => {
  // Props that need to pass to this component
  // options - all choices that can be selected.
  //  Example of Data Structure - options
  //  {
  //    value: {
  //      zipcode: 00000,
  //      subdistrict: "ตำบล",
  //      district: "อำเภอ",
  //      province: "จังหวัด"
  //    },
  //    label: "ตำบล, อำเภอ, จังหวัด, 00000"
  // }

  // selectedOption - an option that got selected data structure is the same as above

  // placeholder - a message before typing ex. "Type here!"

  // minLength - a minimum character length that will trigger a search

  // handleChange - a function which will be called when you select a new option
  // Example of handleChange()
  //
  // const [address, setAddress] = useState(null)
  //
  // const handleChange = (change) => {
  //   setAddress(change)
  // }

  const { handleChange, options, selectedOption, placeholder, minLength, disabled } = props;

  const [ showOptions, setShowOptions ] = useState(false);

  const handleInputChange = useCallback((typedOption) => {
    if (typedOption.length >= minLength ) {
      setShowOptions(true);
    }
    else {
      setShowOptions(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = {
    // container: base => ({
    //   ...base,
    //   flex: 1
    // })
    control: (provided, state) => ({
      ...provided,
      height: "3rem",
      minHeight: "3rem",
      boxShadow: state.isFocused ? null: null,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '3rem',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '3rem',
    }),
  };

  return(
    <Select 
      styles={styles}
      isDisabled={disabled}
      value={selectedOption} 
      options={ showOptions ? options : [] } 
      onChange={ handleChange }
      onInputChange = { handleInputChange }
      placeholder={placeholder}

      // components={{ Input }}
    />
  )
}

export default SearchBarSelect