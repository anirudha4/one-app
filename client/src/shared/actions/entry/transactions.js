import { createAction } from "@reduxjs/toolkit";

// create transactions
export const createTransactionAction = createAction('transactions/create', function prepare(payload) {
    return {
        payload: {
            ...payload,
            tags: Array.isArray(payload.tags) ? payload.tags : payload.tags ? [payload.tags] : []
        }
    }
});
export const createTransactionRequestedAction = createAction('transactions/create/request');
export const createTransactionSucceededAction = createAction('transactions/create/success');
export const createTransactionRecievedAction = createAction('transactions/create/recieve');
export const createTransactionErrorAction = createAction('transactions/create/error');