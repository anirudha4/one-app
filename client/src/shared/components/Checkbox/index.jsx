import React from 'react';
import classNames from 'classnames';
import { TbCheck } from 'react-icons/tb';

function Checkbox({ checked = false, onChange, disabled }) {
    const handleClick = (e) => {
        e.stopPropagation();
        if(disabled) return;
        onChange(!checked);
    }
    const handleKeyDown = e => {
        if(disabled) return;
        if (e.key === ' ') {
            onChange(!checked);
        }
    }
    return (
        <div onKeyDown={handleKeyDown} onClick={handleClick} tabIndex={0} className={classNames(
            "min-h-[16px] min-w-[16px] text-[10px] border border-slate-300 rounded ",
            "flex items-center justify-center cursor-pointer",
            "transition-all duration-100",
            {
                'bg-slate-900 text-white': checked && !disabled,
                'cursor-not-allowed bg-slate-100 text-white': disabled
            },
        )}>
            {(checked) && <TbCheck strokeWidth={3} className={classNames('', {
                'text-slate-400': disabled
            })} />}
        </div>
    )
}

export default Checkbox