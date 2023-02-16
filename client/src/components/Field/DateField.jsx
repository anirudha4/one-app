import React from 'react'
import DatePicker from 'react-datepicker';
import './Field.css';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Alert from '../Alert';
import classNames from 'classnames';

const DateField = ({ id, name, placeholder, label, labelInfo, type, value, onChange, defaultValue = null, ...props }) => {
    const [selected, setSelected] = useState(defaultValue || new Date());
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
                onChange={date => setSelected(date)}
                placeholderText={placeholder}
                customInput={<input className='input w-full' />}
                {...props}
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