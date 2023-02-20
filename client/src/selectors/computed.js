import { createSelector } from "redux-orm";
import orm from "../models/orm";
import { allTransactionSelector } from "./all";

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

export const splitwiseExpensesThatCanBeImported = createSelector(
    orm,
    (_, expensesConfig) => expensesConfig,
    (_, __, showUserExpenses) => showUserExpenses,
    (_, __, ___, splitwiseUser) => splitwiseUser,
    ({ SplitwiseTransaction }, expensesConfig, showUserExpenses, splitwiseUser) => {
        const splitwiseTransactions = SplitwiseTransaction.all().toRefArray();
        if (!expensesConfig.expenses) return { filteredExpenses: [], total: 0, alreadyImported: [] };

        const expenses = expensesConfig.expenses.filter(expense =>
            !(['payment', 'debt_consolidation'].includes(expense.creation_method)) && (showUserExpenses ? expense.created_by.id === splitwiseUser.id : true));

        const alreadyImported = [], filteredExpenses = [];
        for (let index = 0; index < expenses.length; index++) {
            const expense = expenses[index];
            const splitwiseTransaction = splitwiseTransactions.find(splitwiseTransaction => splitwiseTransaction.referenceId == expense.id);
            if (splitwiseTransaction) {
                alreadyImported.push(expense);
            } else {
                filteredExpenses.push(expense);
            }
        }

        return { filteredExpenses, alreadyImported }
    }
)