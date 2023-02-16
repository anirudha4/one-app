import React from 'react'
import classNames from 'classnames'
import { FiInfo } from 'react-icons/fi';

function Alert({ type = 'default', message, icon, className = '' }) {
    return (
        <div className={classNames('h-8 px-4 capitalize text-xs rounded flex items-center gap-2 transition-all duration-100', {
            'text-slate-800 bg-slate-100 hover:bg-slate-200': type === 'default',
            'text-red-500 bg-red-50 hover:bg-red-100': type === 'danger',
            'text-blue-500 bg-blue-50 hover:bg-blue-100': type === 'info',
            'text-yellow-500 bg-yellow-100': type === 'warning',
        }, className)}>
            {icon ? icon : <FiInfo size={18} />}
            {message}
        </div>
    )
}

export default Alert