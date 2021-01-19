import React from 'react'

export default function IconButton({ style, icon, label, onClick }) {
    const handleClick = () => {
        onClick()
    }

    return (
        <div className='button' style={style && style} onClick={handleClick}>
            {icon} {label}
        </div>
    )
}
