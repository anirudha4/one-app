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


// delete transactions
export const deleteTransactionAction = createAction('transactions/delete');
export const deleteTransactionRequestedAction = createAction('transactions/delete/request');
export const deleteTransactionSucceededAction = createAction('transactions/delete/success');
export const deleteTransactionRecievedAction = createAction('transactions/delete/recieve');
export const deleteTransactionErrorAction = createAction('transactions/delete/error');

// bulk delete transactions
export const bulkDeleteTransactionAction = createAction('transactions/delete/bulk');
export const bulkDeleteTransactionRequestedAction = createAction('transactions/delete/bulk/request');
export const bulkDeleteTransactionSucceededAction = createAction('transactions/delete/bulk/success');
export const bulkDeleteTransactionRecievedAction = createAction('transactions/delete/bulk/recieve');
export const bulkDeleteTransactionErrorAction = createAction('transactions/delete/bulk/error');