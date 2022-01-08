import React, { useState } from "react";
import Button from "../widgets/Button";
import Input from "../widgets/Input";

const SearchParcel = () => {
  const [parcelId, setParcelId] = useState('')

  const handleChange = (event) => {
    setParcelId(event.target.value)
  }

  const handleSubmit = () => {
    console.log(parcelId)
  }

  return (
    <div>
      <form>
        <Input
          type="text"
          value={parcelId}
          name="parcelId"
          onChange={handleChange}
        />
        <Button type={"submit"} text={"ค้นหา"} onclick={handleSubmit} />
      </form>
    </div>
  )
}

export default SearchParcel