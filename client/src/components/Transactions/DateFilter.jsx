import classNames from 'classnames';
import moment from 'moment';
import React, { useMemo } from 'react'
import ReactDatePicker from 'react-datepicker';
import { TbArrowLeft, TbArrowRight, TbX } from 'react-icons/tb';
import CustomPopup from '../../shared/components/CustomPopup';
import { formatDate } from '../../utils';

const DateFilter = ({ date, handleDateChange }) => {
    const areControlsDisabled = useMemo(() => {
        return !date;
    }, [date])
    const handleBack = () => {
        if (areControlsDisabled) return;
        handleDateChange(moment(date).subtract(1, 'd'));
    }
    const handleFront = () => {
        if (areControlsDisabled) return;
        handleDateChange(moment(date).add(1, 'd'));
    }
    const clearDate = () => {
        handleDateChange(null);
    }
    return (
        <div className="
            h-[34px] px-2 flex gap-2 items-center rounded border border-slate-400
            hover:border-black transition-all"
        >
            <TbArrowLeft className={classNames('h-full cursor-pointer', {
                'cursor-not-allowed stroke-slate-300': areControlsDisabled
            })} onClick={handleBack} />
            <CustomPopup
                showHeader={true}
                position='bottom center'
                title='Choose Date'
                content={<ReactDatePicker
                    showPopperArrow={false}
                    isClearable
                    inline
                    onChange={handleDateChange}
                    selected={date ? new Date(date) : null}
                />}
                trigger={
                    <div className='cursor-pointer font-semibold h-full flex items-center text-sm text-slate-800 bg-white transition-all'>
                        {date ? formatDate(date) : 'Choose Date'}
                    </div>
                }
            />
            <TbArrowRight className={classNames('h-full cursor-pointer', {
                'cursor-not-allowed stroke-slate-300': areControlsDisabled
            })} onClick={handleFront} />
            <TbX className='cursor-pointer h-full' onClick={clearDate} />
        </div>
    )
}

export default DateFilter