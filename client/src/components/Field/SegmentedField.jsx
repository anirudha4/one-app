import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';

const SegmentedField = ({ id, name, label, options }) => {
    return (
        <div className="field">
            <label className='label' htmlFor={id}>{label}</label>
            <div className="segmented-control">
                {options.map((option) => {
                    return (
                        <Radio
                            key={option.id}
                            option={option}
                            name={name}
                            value={option.value}
                        />
                    )
                })}
            </div>
        </div>
    )
};
SegmentedField.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    useInputMask: PropTypes.bool,
}
export const Radio = ({ option, name, value }) => {
    return (
        <>
            <input className='radio opacity-0 w-0 h-0' id={option.id} type='radio' name={name} value={value} />
            <label className={classNames('segmented-control-option')} htmlFor={option.id}>{option.label}</label>

        </>
    )
}

export default SegmentedField
