import { createAction } from "@reduxjs/toolkit";

// create splitwise integration
export const createSplitwiseIntegrationAction = createAction('splitwise-integrations/create');
export const createSplitwiseIntegrationRequestedAction = createAction('splitwise-integrations/create/request');
export const createSplitwiseIntegrationSucceededAction = createAction('splitwise-integrations/create/success');
export const createSplitwiseIntegrationRecievedAction = createAction('splitwise-integrations/create/recieve');
export const createSplitwiseIntegrationErrorAction = createAction('splitwise-integrations/create/error');


// fetch splitwise transactions
export const fetchSplitwiseTransactionsAction = createAction('splitwise-integrations/fetch-transactions');
export const fetchSplitwiseTransactionsRequestedAction = createAction('splitwise-integrations/fetch-transactions/request');
export const fetchSplitwiseTransactionsSucceededAction = createAction('splitwise-integrations/fetch-transactions/success');
export const fetchSplitwiseTransactionsRecievedAction = createAction('splitwise-integrations/fetch-transactions/recieve');
export const fetchSplitwiseTransactionsErrorAction = createAction('splitwise-integrations/fetch-transactions/error');


// check splitwise transactions
export const checkSplitwiseTransaction = createAction('splitwise-integration/check-transaction')
export const unCheckSplitwiseTransaction = createAction('splitwise-integration/uncheck-transaction')
