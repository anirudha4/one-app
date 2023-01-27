import classNames from 'classnames';
import React from 'react'
import { TbX } from 'react-icons/tb';
import { useSelector } from 'react-redux'
import { allCategoriesSelector } from '../../selectors/all';
import { getColorByTransactionType } from '../../utils/transactions';

function CategoryList() {
  const categories = useSelector(allCategoriesSelector);
  return (
    <div className='overflow-y-auto list-grid gap-2 py-2'>
      {categories.map(category => {
        const color = getColorByTransactionType(category.type);
        return (
          <div key={category.id} className='px-3 py-1 cursor-pointer border border-slate-100 rounded relative flex items-center justify-between group hover:border-slate-300'>
            <div className='flex items-center gap-2'>
              <span className={classNames("min-h-[8px] min-w-[8px] h-[8px] w-[8px] rounded-full", {
                'bg-red-500': category.type === 'expense',
                'bg-teal-500': category.type === 'income',
                'bg-green-500': category.type === 'investment',
                'bg-slate-500': category.type === 'other',
              })}></span>
              <form className='flex-1'>
                <input className='w-full outline-none border-none text-xs font-medium text-slate-600 whitespace-nowrap' defaultValue={category.name} />
              </form>
            </div>
            <div className="min-h-[20px] min-w-[20px] cursor-pointer flex bg-slate-100 items-center justify-center rounded-full invisible duration-100 transition-all hover:bg-slate-800 hover:text-slate-100 group-hover:visible">
              <TbX size={12} />
            </div>
          </div>
        )
      })}
    </div >
  )
}

export default CategoryList