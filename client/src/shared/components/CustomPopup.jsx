import React from 'react'
import { TbArrowLeft } from 'react-icons/tb'
import { Popup } from 'semantic-ui-react'
import Divider from './Divider'

function CustomPopup({ content, trigger, position, showHeader, onBack, title }) {
    return (
        <Popup
            basic
            hoverable
            openOnTriggerMouseEnter={false}
            closeOnTriggerMouseLeave={false}
            content={content}
            trigger={trigger}
            position={position}
            header={showHeader && <PopupHeader onBack={onBack} title={title} />}
        />
    )
}

export default CustomPopup

const PopupHeader = ({ onBack = null, title }) => {
    return (
        <>
            <div className='font-semibold flex items-center gap-2 mb-2 text-slate-700'>
                {onBack && <TbArrowLeft onClick={onBack} size={20} />}
                {title}
            </div>
            <Divider />
        </>
    )
}