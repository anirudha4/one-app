import React from 'react'

function Loader({ size = 18 }) {
    return (
        <div className={`loader ease-linear rounded-full border border-t border-gray-200 h-[${size}px] w-[${size}px]`}></div>
    )
}

export default Loader;