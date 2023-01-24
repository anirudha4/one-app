import React from 'react'
import classNames from 'classnames';
import { OverviewChart } from './OverviewChart';
import Divider from '../../shared/components/Divider';

function OverviewSlot() {
  return (
    <div className='flex gap-6 items-center rounded w-full'>
      <div className="flex flex-col gap-2 justify-center w-full">
        <Stat labelColor='text-teal-500' label={'Income'} amount={2668} />
        <Divider />
        <Stat labelColor='text-rose-500' label={'Expense'} amount={1000} />
        <Divider />
        <Stat labelColor='text-indigo-500' label={'Total'} amount={2668 - 1000} />
      </div>
      <div className="graph w-52 bg-slate-50 rounded flex items-center justify-center">
        <OverviewChart expense={1000} income={2668} />
      </div>
    </div>
  )
}

export default OverviewSlot


export const Stat = ({ labelColor, label, amount }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className={classNames("text-xs font-medium", labelColor)}>{label}</div>
      <div className="text-xl text-slate-900 font-bold">Rs.{amount}</div>
    </div>
  )
}