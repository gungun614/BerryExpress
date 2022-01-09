import React from "react"

const Label = (props) => {

    const { text, color, fontSize, fontWeight, className, isHide } = props

    const style = {
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        display: isHide  ? 'none': 'block'
    }
    
    return <label className={className} style={style}>{text}</label>
}

export default Label