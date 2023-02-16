import { createSlice } from "@reduxjs/toolkit";
import { fetchSplitwiseTransactionsAction, fetchSplitwiseTransactionsErrorAction, fetchSplitwiseTransactionsSucceededAction } from "../actions/entry/splitwise-integrations";

const splitwiseSlice = createSlice({
    name: 'splitwise',
    initialState: {
        fetchingSplitwiseTransactions: false,
        fetchedTransactions: []
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
        }
    }
})

export default splitwiseSlice.reducer;
export const { } = splitwiseSlice.actions;