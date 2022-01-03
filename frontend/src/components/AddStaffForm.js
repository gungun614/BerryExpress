import React, { useState, useRef } from "react"
import Label from "../widgets/Label"
import Button from "../widgets/Button"

const AddStaffForm = () => {
  const [name, setName] = useState("")
  const nameRef = useRef()

  const handleClick = () => {
    setName(nameRef.current.name)
    console.log(name)
  }

  return (
    <div>
      <form>
        <Label text="ชื่อ" />
        <Button type={"submit"} text={"บันทึก"} onClick={handleClick} />
        {name}
      </form>
    </div>

  )
}

export default AddStaffForm