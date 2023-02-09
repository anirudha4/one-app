import React from 'react';
import classNames from 'classnames';
import { TbCheck } from 'react-icons/tb';

function Checkbox({ checked = false, onChange }) {
    const handleClick = (e) => onChange(!checked);
    const handleKeyDown = e => {
        if(e.key === ' ') {
            onChange(!checked);
        }
    }
    return (
        <div onKeyDown={handleKeyDown} onClick={handleClick} tabIndex={0} className={classNames(
            "min-h-[16px] min-w-[16px] text-[10px] border border-slate-300 rounded ",
            "flex items-center justify-center cursor-pointer",
            "transition-all duration-100",
            {
                'bg-slate-700 text-white': checked
            },

        )}>
            {checked && <TbCheck strokeWidth={3} />}
        </div>
    )
}

export default Checkbox