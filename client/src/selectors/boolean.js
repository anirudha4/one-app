import { createSelector } from "@reduxjs/toolkit";

export const isTransactionCheckedForAction = createSelector(
    [
        (state) => state.transaction,
        (_, id) => id,
    ],
    (transaction, id) => {
        return transaction.transactionIdsChecked.includes(id);
    }
)

export const isAllTransactionCheckedForAction = createSelector(
    [
        (state) => state.transaction,
        (_, ids) => ids,
    ],
    (transaction, transactionIds) => {
        const checkedIds = transaction.transactionIdsChecked;
        return transactionIds.every(id => checkedIds.includes(id));
    }
)