import { createSlice } from "@reduxjs/toolkit";
import { checkAllSplitwiseTransaction, checkSplitwiseTransaction, createSplitwiseIntegrationAction, createSplitwiseIntegrationErrorAction, createSplitwiseIntegrationSucceededAction, fetchSplitwiseTransactionsAction, fetchSplitwiseTransactionsErrorAction, fetchSplitwiseTransactionsSucceededAction, importSplitwiseTransactionsAction, importSplitwiseTransactionsErrorAction, importSplitwiseTransactionsSucceededAction, unCheckAllSplitwiseTransaction, unCheckSplitwiseTransaction } from "../actions/entry/splitwise-integrations";

const splitwiseSlice = createSlice({
    name: 'splitwise',
    initialState: {
        fetchingSplitwiseTransactions: false,
        fetchedTransactions: [],
        transactionsToImport: [],
        transactionsImporting: false,
        transactionsImported: false,
        creatingSplitwiseIntegration: false
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
        [unCheckAllSplitwiseTransaction.type]: (state, { }) => {
            state.transactionsToImport = []
        },
        [checkAllSplitwiseTransaction.type]: (state, { payload }) => {
            state.transactionsToImport = payload.transactions;
        },
        [unCheckSplitwiseTransaction.type]: (state, { payload }) => {
            state.transactionsToImport = state.transactionsToImport.filter(transaction => transaction.id !== payload.transactionId);
        },
        [importSplitwiseTransactionsAction.type]: (state) => {
            state.transactionsImporting = true
        },
        [importSplitwiseTransactionsSucceededAction.type]: (state) => {
            state.transactionsImporting = false;
            state.transactionsToImport = []
        },
        [importSplitwiseTransactionsErrorAction.type]: (state) => {
            state.transactionsImporting = false;
        },
        [createSplitwiseIntegrationAction.type]: (state) => {
            state.creatingSplitwiseIntegration = true;
        },
        [createSplitwiseIntegrationErrorAction.type]: (state) => {
            state.creatingSplitwiseIntegration = false;
        },
        [createSplitwiseIntegrationSucceededAction.type]: (state) => {
            state.creatingSplitwiseIntegration = false;
        }
    }
})

export default splitwiseSlice.reducer;
export const { } = splitwiseSlice.actions;