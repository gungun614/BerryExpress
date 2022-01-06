import React from 'react'

const Icon = (props) => {

    const { className, onClick, size, color, title } = props   
    
    const style = {
        fontSize: size,
        color: color,
        cursor: 'pointer'
    }
    
    return <i className={className} style={style} title={title} onClick={onClick} ></i>
}

export default Icon