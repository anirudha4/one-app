import React from 'react'
import classNames from 'classnames';
import { OverviewChart } from './OverviewChart';
import Divider from '../../shared/components/Divider';
import { useSelector } from 'react-redux';
import { transactionsSummarySelector } from '../../selectors/computed';

function OverviewSlot() {
  const { income, expense, investment, total } = useSelector(transactionsSummarySelector);
  return (
    <div className='flex gap-6 items-center rounded w-full'>
      <div className="flex flex-col gap-1 justify-center w-full border-r border-dashed border-slate-200">
        <Stat labelColor='text-teal-500' label={'Income'} amount={income} />
        <Divider />
        <Stat labelColor='text-rose-500' label={'Expense'} amount={expense} />
        <Divider />
        <Stat labelColor='text-blue-500' label={'Investment'} amount={investment} />
      </div>
      <div className="graph w-52 relative rounded flex items-center justify-center">
        <OverviewChart expense={expense} income={income} investment={investment} />
        <div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <span className="text-xs text-gray-500">Total Balance</span>
          <div className="text-md text-slate-600 font-bold whitespace-nowrap">Rs. {parseFloat(total).toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default OverviewSlot


export const Stat = ({ labelColor, label, amount }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className={classNames("text-xs font-medium", labelColor)}>{label}</div>
      <div className={classNames("heading-text text-lg text-slate-700 font-bold", {
        'text-rose-500': amount < 0
      })}>Rs.{parseFloat(amount).toFixed(2)}</div>
    </div>
  )
}