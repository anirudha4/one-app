import React from 'react'
import Checkbox from '../../shared/components/Checkbox'

function TransactionListHeader({ transactionsGrid, checked, handleAllTransactionChecked, expanded }) {
    return (
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
    )
}

export default TransactionListHeader