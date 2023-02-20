import { createSelector as createReselectSelector } from "@reduxjs/toolkit";
import { differenceBy } from "lodash";
import { createSelector } from "redux-orm"
import orm from "../models/orm";

export const isTransactionCheckedForAction = createReselectSelector(
    [
        (state) => state.transaction,
        (_, id) => id,
    ],
    (transaction, id) => {
        return transaction.transactionIdsChecked.includes(id);
    }
)

export const isAllTransactionCheckedForAction = createReselectSelector(
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


export const isSplitwiseExpenseCheckedForAction = createReselectSelector(
    [
        (state) => state.splitwise,
        (_, id) => id,
    ],
    (splitwise, id) => {
        return splitwise.transactionsToImport.find(transaction => transaction.id === id);
    }
)
export const areAllSplitwiseTransactionsSelectedForActionSelector = createReselectSelector(
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

export const makeIsSplitwiseTransactionImported = () => createSelector(
    orm,
    (_, splitwiseTransactionId) => splitwiseTransactionId,
    ({ SplitwiseTransaction }, splitwiseTransactionId) => {
        const splitwiseTransaction = SplitwiseTransaction.all().toRefArray().find(transaction => transaction.referenceId == splitwiseTransactionId);
        return splitwiseTransaction ? true : false;
    }
)

export const isSelectAllCheckboxDisabledSelector = createSelector(
    orm,
    (_, transactions) => transactions,
    ({ SplitwiseTransaction }, transactions) => {
        const splitwiseTransactions = SplitwiseTransaction.all().toRefArray();
        let disabled = false;
        if (!transactions || transactions.length === 0) return true;

        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const expense = splitwiseTransactions.find(splitwiseTransaction => splitwiseTransaction.referenceId == transaction.id);

            if (expense) {
                disabled = true;
                break;
            }
        }

        return disabled;
    }
)