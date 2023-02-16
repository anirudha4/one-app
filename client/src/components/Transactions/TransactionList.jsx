import React, { useMemo } from 'react'
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand, TbPlus } from 'react-icons/tb'
import { ImDrawer2 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '../../shared/components/Divider'
import { allTransactionSelector } from '../../selectors/all';
import Transaction from './Transaction';
import { transactionIdsCheckedForActions, transactionIdsUncheckedForActions } from '../../shared/slices/transaction';
import { isAllTransactionCheckedForAction } from '../../selectors/boolean';
import BulkAction from './BulkAction';
import TransactionListHeader from './TransactionListHeader';

function TransactionList({ expanded, setExpanded }) {
    const dispatch = useDispatch();

    // selectors
    const transactions = useSelector(allTransactionSelector);

    const transactionIds = useMemo(() => {
        return transactions.map(transaction => transaction.id);
    }, [transactions])

    const checkedTransactionIds = useSelector(state => state.transaction.transactionIdsChecked);
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
                    {checkedTransactionIds.length > 0 && (
                        <BulkAction checkedTransactionIds={checkedTransactionIds} />
                    )}
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
            <TransactionListHeader
                transactionsGrid={transactionsGrid}
                checked={checked}
                handleAllTransactionChecked={handleAllTransactionChecked}
                expanded={expanded}
            />

            <Divider />
            {/* List */}
            <div className="h-full overflow-scroll">
                {transactions.length === 0 && (
                    <div className="mx-auto h-full w-fit text-center flex flex-col gap-4 justify-center mt-[-30px]">
                        <ImDrawer2 size={200} className='text-gray-300' />
                        <div className="text-sm text-slate-500">
                            No transactions.
                        </div>
                    </div>
                )}
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