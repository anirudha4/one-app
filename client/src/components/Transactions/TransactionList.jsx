import React from 'react'
import { TbPlus } from 'react-icons/tb'
import { Link } from 'react-router-dom';
import Divider from '../../shared/components/Divider'

function TransactionList() {
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
        </div>
    )
}

export default TransactionList