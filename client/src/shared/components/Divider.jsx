import classNames from 'classnames'
import React from 'react'

function Divider({ className }) {
    return (
        <div className={classNames("border-b border-slate-200 border-dashed w-full mb-2", className)}></div>
    )
}

export default Divider