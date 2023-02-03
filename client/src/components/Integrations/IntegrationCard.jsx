import React from 'react'
import { Link } from 'react-router-dom'
import { TbPlus } from 'react-icons/tb';
import Divider from '../../shared/components/Divider'

function IntegrationCard({ path, name, connect, description }) {
    return (
        <div className="p-4 rounded bg-white border border-slate-100 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <img src={path} width={25} height={25} alt="" />
                    <span className='font-medium text-slate-700'>{name}</span>
                </div>
                <Link to={connect} className='btn-sm'>
                    <TbPlus />
                    <span>
                        Connect
                    </span>
                </Link>
            </div>
            <Divider />
            <span className='text-xs leading-3'>
                {description}
            </span>
        </div>
    )
}

export default IntegrationCard