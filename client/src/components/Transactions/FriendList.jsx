import React from 'react'
import { Link } from 'react-router-dom';
import { TbPlus, TbX } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { allMembersSelector } from '../../selectors/all';

function FriendList() {
  const members = useSelector(allMembersSelector);
  return (
    <div className='h-full relative overflow-auto'>
      <div className="grid grid-cols-2 gap-2 py-2 overflow-y-auto items-start">
        {members.map(member => {
          return (
            <div key={member.id} className='px-3 py-1 cursor-pointer border border-slate-100 rounded relative flex items-center justify-between focus-within:border-slate-300 group hover:border-slate-300'>
              <div className='flex items-center gap-2'>
                <form className='flex-1 flex items-center'>
                  <input className='w-full outline-none border-none text-xs font-medium text-slate-600 whitespace-nowrap' defaultValue={member.name || member.email} />
                </form>
              </div>
              <div className="min-h-[20px] min-w-[20px] cursor-pointer flex bg-slate-100 items-center justify-center rounded-full invisible duration-100 transition-all hover:bg-slate-800 hover:text-slate-100 group-hover:visible">
                <TbX size={12} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FriendList