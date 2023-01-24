import React, { useState } from 'react';

export default function NumberField({ id, name, placeholder, label, type, value, onChange, useInputMask, mask, ...props }) {
    const [localValue, setLocalValue] = useState('');
    const regex = /^\d*$/; // regular expression for numbers only

    const handleChange = (e) => {
        let input = e.target.value;
        if (regex.test(input) || input === '') {
            setLocalValue(input);
        }
    };

    return (
        <div className="field group">
            <label className='label' htmlFor={id}>{label}</label>
            <input className='input' inputMode='numeric' name={name} type={type} placeholder={placeholder} value={localValue} onChange={handleChange} {...props} />
        </div>
    );
}
