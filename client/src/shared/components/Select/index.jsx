import classNames from 'classnames';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { useOutsideClick } from '../../hooks';

function Select({ id, name, placeholder, label, value, onChange, options = [], ...props }) {
    const [selected, setSelected] = useState(options[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const ref = useRef();
    useOutsideClick(ref, () => setOpen(false))
    const handleChange = option => {
        setSelected(option);
        setOpen(false);
    }
    const handleKeyDown = e => {
        if (e.key === ' ') {
            setOpen(!open);
        }
        if (e.key === 'ArrowDown') {
            setCurrentIndex(currentIndex === options.length ? currentIndex : currentIndex + 1);
        }
        else if (e.key === 'ArrowUp') {
            setCurrentIndex(currentIndex === 0 ? currentIndex : currentIndex - 1);
        }
    }
    useEffect(() => {
        setSelected(options[currentIndex]);
    }, [currentIndex])
    return (
        <div className='field' ref={ref}>
            <div className="label">{label}</div>
            <div onKeyDown={handleKeyDown} onClick={() => setOpen(!open)} tabIndex={0} className="input select-none flex items-center cursor-pointer">
                <span className='flex-1'>{selected.label}</span>
                {!open ? <TbChevronDown /> : <TbChevronUp />}
            </div>
            <div
                className={classNames('select', {
                    'show-select': !open
                })}
            >
                {options.map(option => {
                    return (
                        <div className={classNames('select-option select-none', {
                            'bg-slate-200': selected.id === option.id
                        })} key={option.id} onClick={() => setOpen(false)} onChange={e => handleChange(option)}>
                            <label className={classNames('cursor-pointer', {
                                'flex items-center gap-2': !!option.extraLabel
                            })} htmlFor={option.id}>
                                {option.label}
                            </label>
                            <input tabIndex={0} className='cursor-pointer' value={option.value} type="radio" name={name} id={option.id} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Select