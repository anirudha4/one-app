import React from 'react'
import { TbX } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import Divider from './Divider'

function SidepanelWrapper({ back, title, children }) {
    return (
        <div className='add-transaction-modal-container flex items-center justify-center'>
            <Link to={back}>
                <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-40 z-10"></div>
            </Link>
            <div className="fixed z-20 top-0 right-0 h-full add-transaction-card p-4 bg-white max-w-[500px] w-full transition-all duration-75">
                <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="text-slate-700 text-sm font-medium flex-1 truncate">{title}</div>
                    <Link replace to={back} className="h-7 w-7 bg-slate-100 flex items-center justify-center rounded-md hover:bg-slate-200 cursor-pointer transition-all">
                        <TbX className='text-slate-600' />
                    </Link>
                </div>
                <Divider />
                {children}
            </div>
        </div>
    )
}

export default SidepanelWrapper