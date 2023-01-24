import React, { forwardRef } from 'react'
import PropTypes from 'prop-types';
import ReactInputMask from 'react-input-mask';

const Field = ({ id, name, placeholder, label, type, value, onChange, useInputMask, mask, ...props }) => {
    return (
        <div className="field group">
            <label className='label' htmlFor={id}>{label}</label>
            {useInputMask ? (
                <ReactInputMask mask={mask}>
                    {(inputProps) => <input className='input' name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} {...props} {...inputProps} />}
                </ReactInputMask>
            ) : (
                <input className='input' name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} {...props} />
            )}
        </div>
    )
};
Field.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    useInputMask: PropTypes.bool,
}
export default Field