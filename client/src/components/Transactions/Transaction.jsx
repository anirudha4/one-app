import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTransactionTypeColor } from '../../utils/transactions';
import Checkbox from '../../shared/components/Checkbox';
import { deleteTransactionAction } from '../../shared/actions/entry/transactions';
import TransactionTags from './TransactionTags';
import { transactionIdCheckedForActions, transactionIdUncheckedForActions } from '../../shared/slices/transaction';
import { isTransactionCheckedForAction } from '../../selectors/boolean';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';

function Transaction({ id, name, amount, type, date, user, category, organization, transactionsGrid, expanded }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // selectors
    const checked = useSelector(state => isTransactionCheckedForAction(state, id));
    const handleDelete = () => {
        dispatch(deleteTransactionAction({ id }))
    }
    const navigateToTransaction = () => {
        navigate(`/app/transactions/${id}`);
    }
    const handleChecked = (isChecked) => {
        if(isChecked) {
            dispatch(transactionIdCheckedForActions({ transactionId: id }));
        } else {
            dispatch(transactionIdUncheckedForActions({ transactionId: id }));
        }
    }
    return (
        <div onClick={navigateToTransaction} style={{ gridTemplateColumns: transactionsGrid }} className="transaction-column-grid select-none w-full py-3 px-4 rounded-md transition-all duration-100 cursor-pointer group hover:bg-slate-100">
            <Checkbox checked={checked} onChange={handleChecked} />
            <div className="text-xs text-left text-slate-600 font-medium flex-1 truncate">
                {name}
            </div>
            <div className={`text-xs capitalize font-medium ${getTransactionTypeColor(type)}`}>
                Rs. {parseFloat(amount).toFixed(2)}
            </div>
            <div className={classNames("text-xs text-slate-600 capitalize font-medium truncate")} title={category.name}>
                {category.name}
            </div>
            {expanded && <TransactionTags id={id} />}
            <div className="text-xs text-slate-600">{formatDate(date)}</div>
        </div>
    )
}

export default Transaction