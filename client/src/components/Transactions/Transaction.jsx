import React from 'react'
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getTransactionTypeColor } from '../../utils/transactions';
import Checkbox from '../../shared/components/Checkbox';
import { deleteTransactionAction } from '../../shared/actions/entry/transactions';
import TransactionTags from './TransactionTags';

function Transaction({ id, name, amount, type, date, user, category, organization, transactionsGrid, expanded }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteTransactionAction({ id }))
    }
    return (
        <div style={{ gridTemplateColumns: transactionsGrid }} className="transaction-column-grid w-full py-3 px-4 rounded-md transition-all duration-100 cursor-pointer group hover:bg-slate-100">
            <Checkbox onClick={handleDelete} />
            <div className="text-xs text-left text-slate-600 font-medium flex-1 truncate">
                {name}
            </div>
            <div className={classNames("text-xs text-slate-600 capitalize font-medium", `text-${getTransactionTypeColor(type)}-500`)}>
                Rs. {amount}
            </div>
            <div className={classNames("text-xs text-slate-600 capitalize font-medium truncate")} title={category.name}>
                {category.name}
            </div>
            {expanded && <TransactionTags id={id} />}
            <div className="text-xs text-slate-600">{new Date(date).toLocaleString('en-us', {
                month: 'short',
                day: '2-digit',
            })}</div>
        </div>
    )
}

export default Transaction