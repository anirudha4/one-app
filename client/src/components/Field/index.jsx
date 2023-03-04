import React from 'react'
import PropTypes from 'prop-types';

const Field = ({ id, name, placeholder, label, ...props }) => {
    return (
        <div className="field group w-full">
            {label && <label className='label' htmlFor={id}>{label}</label>}
            <input className='input' name={name} placeholder={placeholder} {...props} />
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