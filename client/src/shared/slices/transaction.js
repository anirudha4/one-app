import { createSlice } from "@reduxjs/toolkit";
import {
    createTransactionAction,
    createTransactionSucceededAction,
    createTransactionErrorAction
} from '../actions/entry/transactions';

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        addingTransactionLoader: false
    },
    reducers: {},
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
    }
})

export default transactionSlice.reducer;

export const { addingTransactionLoader } = transactionSlice.actions;