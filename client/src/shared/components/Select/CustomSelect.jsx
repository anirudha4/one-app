import React from 'react'
import Select from 'react-select'
import Creatable from 'react-select/creatable';

import './Select.css';

function CustomSelect({ options, name, value, onChange, label, id, ...props }) {
    return (
        <div className="field">
            {label && <label className='label' htmlFor={id}>{label}</label>}
            <Select
                id={id}
                value={value}
                options={options}
                name={name}
                menuPlacement={'auto'}
                onChange={onChange}
                classNamePrefix="react-select"
                className='react-select-container'
                theme={(theme) => ({
                    ...theme,
                    borderRadius: '.25rem',
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                    },
                })}
                {...props}
            />
        </div>
    )
}

export default CustomSelect

export const CreatableSelect = ({ options, name, value, onChange, label, id, ...props }) => {
    return (
        <div className="field">
            <label className='label' htmlFor={id}>{label}</label>
            <Creatable
                id={id}
                value={value}
                options={options}
                name={name}
                onChange={onChange}
                tabSelectsValue={false}
                classNamePrefix="react-select"
                className='react-select-container'
                theme={(theme) => ({
                    ...theme,
                    borderRadius: '.25rem',
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                    },
                })}
                {...props}
            />
        </div>
    )
}