import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isSplitwiseExpenseCheckedForAction, makeIsSplitwiseTransactionImported } from '../../../selectors/boolean'
import { checkSplitwiseTransaction, unCheckSplitwiseTransaction } from '../../../shared/actions/entry/splitwise-integrations'
import Checkbox from '../../../shared/components/Checkbox'

function SplitwiseExpenseList({ filteredExpenses }) {
    return (
        <>
            {filteredExpenses.map(expense => {
                return (
                    <SplitwiseExpense key={expense.id} expense={expense} />
                )
            })}
        </>
    )
}

export default SplitwiseExpenseList

export const SplitwiseExpense = ({ expense }) => {
    const dispatch = useDispatch();
    const isExpenseChecked = useSelector(state => isSplitwiseExpenseCheckedForAction(state, expense.id));

    const isSplitwiseTransactionImported = useMemo(makeIsSplitwiseTransactionImported, [expense.id]);
    const isDisabled = useSelector(state => isSplitwiseTransactionImported(state, expense.id));
    const handleCheck = checked => {
        if (checked) {
            dispatch(checkSplitwiseTransaction({ transaction: expense }))
        } else {
            dispatch(unCheckSplitwiseTransaction({ transactionId: expense.id }))
        }
    }
    return (
        <div className="p-2 border rounded splitwise-expense-grid">
            <div className="flex gap-2 items-center">
                <Checkbox checked={isDisabled ? true : isExpenseChecked} disabled={isDisabled} onChange={handleCheck} />
                <div className="text-xs font-semibold truncate">
                    {expense.description}
                </div>
                <div className="px-2 py-[2px] text-[10px] font-medium text-slate-700 bg-slate-50 border border-slate-300 rounded capitalize w-fit">
                    {expense.created_by.first_name.toLowerCase()} paid Rs.{expense.cost}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-end">
                {expense.users.map(user => {
                    return (
                        <div key={user.user_id} className="px-2 py-1 text-[10px] font-medium text-black bg-slate-100 rounded capitalize">
                            {user.user.first_name.toLowerCase()}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}