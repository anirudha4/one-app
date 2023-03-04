import React from 'react'
import { TbX } from 'react-icons/tb';
import { useDispatch } from 'react-redux'
import Divider from '../Divider';
import { toggleFilterPopup } from '../../slices/core';

function BottomSheet({ title, onClose, children }) {
  return (
    <>
      <div onClick={onClose} className="fixed top-0 left-0 h-screen w-full bg-black opacity-70" />
      <div className='sheet'>
        <div className="flex items-center justify-between mb-2">
          <div className="heading-text text-slate-700">{title}</div>
          <div onClick={onClose} className="h-7 w-7 bg-slate-100 flex items-center justify-center rounded-md hover:bg-slate-200 cursor-pointer transition-all">
            <TbX className='text-slate-600' />
          </div>
        </div>
        <Divider />
        {children}
      </div>
    </>
  )
}

export default BottomSheet