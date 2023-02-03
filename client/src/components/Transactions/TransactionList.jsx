import React from 'react'
import { TbPlus } from 'react-icons/tb'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Divider from '../../shared/components/Divider'
import { allTransactionSelector } from '../../selectors/all';
import Transaction from './Transaction';
import Checkbox from '../../shared/components/Checkbox';

function TransactionList() {
    const transactions = useSelector(allTransactionSelector);
    return (
        <div className="p-4 transaction-list flex flex-col card h-full">
            <div className='flex items-center justify-between mb-2'>
                <div className="heading-text text-slate-700 text-lg font-medium">Transactions</div>
                <Link to={'?add_transaction=true'}>
                    <button className='btn-primary'>
                        <TbPlus size={16} />
                        <span>Add Transaction</span>
                    </button>
                </Link>
            </div>
            <Divider />
            {/* Header */}
            <div className="transaction-column-grid px-4 py-3 font-medium">
                <div className="text-center text-xs text-slate-500 uppercase">
                    <Checkbox />
                </div>
                <div className="text-xs text-slate-500 uppercase">Name</div>
                <div className="text-xs text-slate-500 uppercase">Amount</div>
                <div className="text-xs text-slate-500 uppercase">Category</div>
                <div className="text-xs text-slate-500 uppercase">Date</div>
            </div>
            <Divider />
            {/* List */}
            <div className="h-full overflow-scroll">
                {transactions.map(transaction => {
                    return (
                        <Transaction key={transaction.id} {...transaction} />
                    )
                })}
            </div>
        </div>
    )
}

export default TransactionList