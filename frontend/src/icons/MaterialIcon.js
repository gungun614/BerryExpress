import React from "react";

const MaterialIcon = (props) => {
  const { iconName } = props

  return (
    <span className="material-icons-outlined">
      {iconName}
    </span>
  )
}

export default MaterialIcon