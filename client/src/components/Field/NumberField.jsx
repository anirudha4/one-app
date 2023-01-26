import React, { useState } from 'react';

export default function NumberField({ id, name, placeholder, label, type, value, onChange, useInputMask, mask, notation, ...props }) {
    const [localValue, setLocalValue] = useState('');
    const regex = /^\d*$/; // regular expression for numbers only

    const handleChange = (e) => {
        let input = e.target.value;
        if (regex.test(input) || input === '') {
            setLocalValue(input);
        }
    };

    return (
        <div className="field">
            <label className='label' htmlFor={id}>{label}</label>
            {notation ? (
                <div className='relative w-full flex items-center'>
                    <label className="absolute text-xs text-slate-400 left-3 w-auto" htmlFor={id}>{notation}</label>
                    <input className='py-2 pl-8 w-full pr-2 text-xs outline-none border border-gray-300 rounded hover:border-gray-700 focus:border-gray-900 transition-all' inputMode='numeric' name={name} type={type} placeholder={placeholder} value={localValue} onChange={handleChange} {...props} />
                </div>
            ) : (
                <input className='input' inputMode='numeric' name={name} type={type} placeholder={placeholder} value={localValue} onChange={handleChange} {...props} />
            )}
        </div>
    );
}
