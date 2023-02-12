import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeTransactionTagsByTransactionId } from '../../selectors/by-id'

function TransactionTags({ id }) {
    const transactionTagsByTransactionId = useMemo(makeTransactionTagsByTransactionId)
    const transactionTags = useSelector(state => transactionTagsByTransactionId(state, id));
    const trimmedTransactionTags = useMemo(() => {
        const total = transactionTags.length;
        let updatedTransactionTags = [...transactionTags];
        if (total > 2) {
            updatedTransactionTags = updatedTransactionTags.slice(0, 2)
            updatedTransactionTags.push({ name: `+${transactionTags.length - 2}` });
        }
        return updatedTransactionTags;
    }, [transactionTags]);

    return (
        <div className='flex items-center gap-2 flex-wrap' key={id}>
            {trimmedTransactionTags.length === 0 && (
                <div className="text-xs text-slate-400">
                    NA
                </div>
            )}
            {trimmedTransactionTags.map(transactionTag => {
                return (
                    <div key={transactionTag.key} style={{ backgroundColor: transactionTag.color, color: 'white' }} className="text-[9px] rounded-full bg-slate-800 text-white py-1 px-3 font-bold">{transactionTag.name}</div>
                )
            })}
        </div>
    )
}

export default TransactionTags