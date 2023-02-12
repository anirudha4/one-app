import { createSlice } from "@reduxjs/toolkit";
import {
    createTransactionAction,
    createTransactionSucceededAction,
    createTransactionErrorAction,
    bulkDeleteTransactionSucceededAction,
    bulkDeleteTransactionAction
} from '../actions/entry/transactions';

const initialState = {
    addingTransactionLoader: false,
    deletingTransactionLoader: false,
    transactionIdsChecked: [],
}
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        transactionIdCheckedForActions: (state, { payload }) => {
            state.transactionIdsChecked = [...state.transactionIdsChecked, payload.transactionId]
        },
        transactionIdUncheckedForActions: (state, { payload }) => {
            state.transactionIdsChecked = state.transactionIdsChecked.filter(id => id !== payload.transactionId);
        },
        transactionIdsCheckedForActions: (state, { payload }) => {
            state.transactionIdsChecked = payload.transactionIds;
        },
        transactionIdsUncheckedForActions: (state, { }) => {
            state.transactionIdsChecked = [];
        }
    },
    extraReducers: {
        [createTransactionAction.type]: (state) => {
            state.addingTransactionLoader = true
        },
        [createTransactionSucceededAction.type]: (state) => {
            state.addingTransactionLoader = false
        },
        [createTransactionErrorAction.type]: (state) => {
            state.addingTransactionLoader = false
        },
        [bulkDeleteTransactionAction.type]: (state) => {
            state.deletingTransactionLoader = true
        },
        [bulkDeleteTransactionSucceededAction.type]: (state) => {
            state.transactionIdsChecked = [];
            state.deletingTransactionLoader = false;
        },
    }
})

export default transactionSlice.reducer;

export const {
    transactionIdCheckedForActions,
    transactionIdUncheckedForActions,
    transactionIdsCheckedForActions,
    transactionIdsUncheckedForActions
} = transactionSlice.actions;