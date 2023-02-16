import { createSlice } from "@reduxjs/toolkit";
import { checkSplitwiseTransaction, fetchSplitwiseTransactionsAction, fetchSplitwiseTransactionsErrorAction, fetchSplitwiseTransactionsSucceededAction, unCheckSplitwiseTransaction } from "../actions/entry/splitwise-integrations";

const splitwiseSlice = createSlice({
    name: 'splitwise',
    initialState: {
        fetchingSplitwiseTransactions: false,
        fetchedTransactions: [],
        transactionsToImport: []
    },
    reducers: {},
    extraReducers: {
        [fetchSplitwiseTransactionsAction.type]: (state) => {
            state.fetchingSplitwiseTransactions = true
        },
        [fetchSplitwiseTransactionsSucceededAction.type]: (state, action) => {
            state.fetchedTransactions = action.payload.expenses;
            state.fetchingSplitwiseTransactions = false;
        },
        [fetchSplitwiseTransactionsErrorAction.type]: (state) => {
            state.fetchingSplitwiseTransactions = false
        },
        [checkSplitwiseTransaction.type]: (state, { payload }) => {
            state.transactionsToImport = [...state.transactionsToImport, payload.transaction]
        },
        [unCheckSplitwiseTransaction.type]: (state, { payload }) => {
            state.transactionsToImport = state.transactionsToImport.filter(transaction => transaction.id !== payload.transactionId);
        },
    }
})

export default splitwiseSlice.reducer;
export const { } = splitwiseSlice.actions;