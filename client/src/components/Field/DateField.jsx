import React from 'react'
import DatePicker from 'react-datepicker';
import './Field.css';

import PropTypes from 'prop-types';
import { useState } from 'react';

const DateField = ({ id, name, placeholder, label, type, value, onChange, ...props }) => {
    const [selected, setSelected] = useState(new Date());
    return (
        <div className="">
            {label && <label className='label mb-2 block' htmlFor={id}>{label}</label>}
            <DatePicker
                autoComplete='off'
                showPopperArrow={false}
                name={name}
                isClearable 
                clearButtonClassName='close-btn'
                selected={selected}
                onChange={date => setSelected(date)}
                placeholderText={placeholder}
                customInput={<input className='input w-full' {...props} />}
            />
        </div>
    )
};
DateField.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    useInputMask: PropTypes.bool,
}
export default DateField