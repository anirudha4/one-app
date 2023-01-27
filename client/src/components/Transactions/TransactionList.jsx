import React from 'react'
import { TbPlus } from 'react-icons/tb'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Divider from '../../shared/components/Divider'
import { allTransactionSelector } from '../../selectors/all';
import Transaction from './Transaction';

function TransactionList() {
    const transactions = useSelector(allTransactionSelector);
    return (
        <div className="transaction-list flex flex-col bg-white p-4 rounded">
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
            <div className="flex"></div>
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