import React from "react"

const Label = (props) => {
    const { text, style, className } = props
    return <label className={className} style={style}>{text}</label>
}

export default Label