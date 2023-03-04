import React, { useState } from 'react';

export default function NumberField({ id, name, placeholder, label, defaultValue = '', type, useInputMask, onChange, mask, notation, ...props }) {
    const [localValue, setLocalValue] = useState(defaultValue);
    const regex = /^\d*$/; // regular expression for numbers only

    const handleChange = (e) => {
        let input = e.target.value;
        if (regex.test(input) || input === '') {
            setLocalValue(input);
            onChange(e);
        }
    };

    return (
        <div className="field">
            <label className='label' htmlFor={id}>{label}</label>
            {notation ? (
                <div className='relative w-full flex items-center'>
                    <label className="absolute text-xs text-slate-400 left-3 w-auto" htmlFor={id}>{notation}</label>
                    <input type={'text'} className='py-2 pl-8 w-full pr-2 text-xs outline-none border border-gray-300 rounded hover:border-gray-700 focus:border-gray-900 transition-all' inputMode='numeric' name={name} placeholder={placeholder} value={localValue} onChange={handleChange} {...props} />
                </div>
            ) : (
                <input className='input' inputMode='numeric' name={name} placeholder={placeholder} value={localValue} onChange={handleChange} {...props} />
            )}
        </div>
    );
}
