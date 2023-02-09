import React, { useMemo } from 'react'
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand, TbPlus } from 'react-icons/tb'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '../../shared/components/Divider'
import { allTransactionSelector } from '../../selectors/all';
import Transaction from './Transaction';
import Checkbox from '../../shared/components/Checkbox';
import { transactionIdsCheckedForActions, transactionIdsUncheckedForActions } from '../../shared/slices/transaction';
import { isAllTransactionCheckedForAction } from '../../selectors/boolean';

function TransactionList({ expanded, setExpanded }) {
    const dispatch = useDispatch();


    // selectors
    const transactions = useSelector(allTransactionSelector);

    const transactionIds = useMemo(() => {
        return transactions.map(transaction => transaction.id);
    }, [transactions])

    const checked = useSelector(state => isAllTransactionCheckedForAction(state, transactionIds));

    const transactionsGrid = useMemo(() => {
        return expanded ? '14px 1fr 130px 130px 250px 50px' : '14px 1fr 130px 130px 50px';
    }, [expanded])

    // handlers
    const handleAllTransactionChecked = (checked) => {
        if (checked) {
            dispatch(transactionIdsCheckedForActions({ transactionIds }));
        } else {
            dispatch(transactionIdsUncheckedForActions());
        }

    }
    const handleExpand = () => setExpanded(!expanded);
    return (
        <div className="p-4 transaction-list flex flex-col card h-full select-none">
            <div className='flex items-center justify-between mb-2'>
                <div className="heading-text text-slate-700 text-lg font-medium">Transactions</div>
                <div className="flex items-center gap-2">
                    <button className="btn-floating transition-all group hover:gap-2 hover:w-32" onClick={handleExpand}>
                        {expanded ? <TbLayoutSidebarRightExpand size={18} /> : <TbLayoutSidebarLeftExpand size={18} />}
                        <span className="text-xs text-white whitespace-nowrap w-0 overflow-hidden transition-all group-hover:block  group-hover:w-fit">
                            {expanded ? 'Collapse' : 'Expand'}
                        </span>
                    </button>
                    <Link to={'?add_transaction=true'}>
                        <button className='btn-primary'>
                            <TbPlus size={16} />
                            <span>Add Transaction</span>
                        </button>
                    </Link>
                </div>
            </div>
            <Divider />
            {/* Header */}
            <div className="transaction-column-grid px-4 py-3 font-medium" style={{ gridTemplateColumns: transactionsGrid }}>
                <div className="text-center text-xs text-slate-500 uppercase">
                    <Checkbox checked={checked} onChange={handleAllTransactionChecked} />
                </div>
                <div className="text-xs text-slate-500 uppercase">Name</div>
                <div className="text-xs text-slate-500 uppercase">Amount</div>
                <div className="text-xs text-slate-500 uppercase">Category</div>
                {expanded && <div className="text-xs text-slate-500 uppercase">Tags</div>}
                <div className="text-xs text-slate-500 uppercase">Date</div>
            </div>
            <Divider />
            {/* List */}
            <div className="h-full overflow-scroll">
                {transactions.map(transaction => {
                    return (
                        <Transaction expanded={expanded} transactionsGrid={transactionsGrid} key={transaction.id} {...transaction} />
                    )
                })}
            </div>
        </div>
    )
}

export default TransactionList