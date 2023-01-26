import React, { forwardRef } from 'react'
import PropTypes from 'prop-types';

const TextField = ({ id, name, placeholder, label, type, value, onChange, ...props }) => {
    return (
        <div className="field group">
            <label className='label' htmlFor={id}>{label}</label>
            <textarea className='input resize-none' name={name} type={type} placeholder={placeholder} onChange={onChange} {...props} >
                {value}
            </textarea>
        </div>
    )
};
TextField.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    useInputMask: PropTypes.bool,
}
export default TextField