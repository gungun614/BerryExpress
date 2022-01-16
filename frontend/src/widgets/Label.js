import React from "react"

const Label = (props) => {

    const { text, color, fontSize, fontWeight, className, isHide, require } = props

    const style = {
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        display: isHide  ? 'none': 'block'
    }
    
    return <label className={className} style={style}>{text} {require ? <span style={{ color: "red" }}> * </span> : ' '}</label>
}

export default Label