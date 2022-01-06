import React from "react"

const Label = (props) => {

    const { text, color, fontSize, fontWeight, className } = props

    const style = {
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight
    }
    
    return <label className={className} style={style}>{text}</label>
}

export default Label