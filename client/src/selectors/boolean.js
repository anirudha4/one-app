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
        if (transactionIds.length === 0) return false;
        const checkedIds = transaction.transactionIdsChecked;
        return transactionIds.every(id => checkedIds.includes(id));
    }
)


export const isSplitwiseExpenseCheckedForAction = createSelector(
    [
        (state) => state.splitwise,
        (_, id) => id,
    ],
    (splitwise, id) => {
        return splitwise.transactionsToImport.find(transaction => transaction.id === id);
    }
)
export const areAllSplitwiseTransactionsSelectedForActionSelector = createSelector(
    [
        (state) => state.splitwise,
        (_, transactions) => transactions,
    ],
    (splitwise, transactions) => {
        if (transactions.length === 0) return false;
        const checkedIds = splitwise.transactionsToImport;
        return transactions.every(id => checkedIds.includes(id));
    }
)
