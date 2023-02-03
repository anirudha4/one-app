import React from 'react'
import { TbCheck } from 'react-icons/tb';

function Checkbox({ checked, onClick }) {
    return (
        <div onClick={onClick} tabIndex={0} className="min-h-[14px] min-w-[14px] text-[10px] border border-slate-300 rounded flex items-center justify-center cursor-pointer transition-all duration-100 group-hover:border-slate-400 hover:border-slate-500">
            {checked && <TbCheck />}
        </div>
    )
}

export default Checkbox