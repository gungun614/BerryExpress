import React from "react";

const MaterialIcon = (props) => {
  const { iconName } = props

  return (
    <span className="material-icons-outlined md-36">
      {iconName}
    </span>
  )
}

export default MaterialIcon