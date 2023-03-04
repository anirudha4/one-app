import React from 'react'
import DatePicker from 'react-datepicker';
import './Field.css';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Alert from '../Alert';
import classNames from 'classnames';

const DateField = ({ id, name, placeholder, label, labelInfo, type, value, onChange, defaultValue = null, ...props }) => {
    const [selected, setSelected] = useState(defaultValue || new Date());
    const handleChange = date => {
        setSelected(date);
        onChange({ target: { value: date } });
    }
    return (
        <div className="w-full">
            {label && <label className={classNames('label mb-2 block')} htmlFor={id}>{label}</label>}
            <DatePicker
                autoComplete='off'
                showPopperArrow={false}
                name={name}
                isClearable
                clearButtonClassName='close-btn'
                selected={selected}
                onChange={handleChange}
                placeholderText={placeholder}
                customInput={<input className='input w-full' />}
                {...props}
            />
        </div>
    )
};

export default DateField