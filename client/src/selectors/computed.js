import { createSelector } from "redux-orm";
import orm from "../models/orm";
import { allTransactionSelector } from "./all";
import { currentWalletSelector } from "./current";

export const transactionsSummarySelector = createSelector(
    orm,
    allTransactionSelector,
    /**
     * 
     * @param {object} orm 
     * @param {array} transactions 
     * @returns 
     */
    ({ }, transactions) => {
        let expense = 0, income = 0, investment = 0;
        transactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                expense += transaction.amount;
            }
            else if (transaction.type === 'income') {
                income += transaction.amount;
            }
            else {
                investment += transaction.amount;
            }
        })
        return {
            expense,
            income,
            investment,
            total: (income) - (expense + investment)
        }
    }
)