import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from 'react-toastify';
import { createSplitwiseIntegration, fetchSplitwiseTransactions, importSplitwiseTransactions } from "../../../api/splitwise-integration";
import { generateAuthenticationHeaders } from "../../../utils/authentication";
import { createSplitwiseIntegrationAction, createSplitwiseIntegrationErrorAction, createSplitwiseIntegrationSucceededAction, fetchSplitwiseTransactionsAction, fetchSplitwiseTransactionsErrorAction, fetchSplitwiseTransactionsSucceededAction, importSplitwiseTransactionsAction, importSplitwiseTransactionsErrorAction, importSplitwiseTransactionsSucceededAction } from '../../actions/entry/splitwise-integrations';

function* createSplitwiseIntegrationWorker({ payload }) {
    try {
        const { splitwiseIntegration } = yield call(createSplitwiseIntegration, payload, generateAuthenticationHeaders());
        yield put(createSplitwiseIntegrationSucceededAction({ splitwiseIntegration }));

        // navigate to splitwise integration page
        window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/app/integrations/splitwise/${splitwiseIntegration.id}`;
    } catch (err) {
        yield put(createSplitwiseIntegrationErrorAction(err));
    }

}
function* fetchSplitwiseTransactionsWorker({ payload }) {
    try {
        const { expenses } = yield call(fetchSplitwiseTransactions, payload.id, generateAuthenticationHeaders());
        yield put(fetchSplitwiseTransactionsSucceededAction({ expenses }));
    } catch (error) {
        console.log(err);
        yield put(fetchSplitwiseTransactionsErrorAction(err))
    }
}

function * importSplitwiseTransactionsWorker({ payload }) {
    try {
        const { integrationId, transactionsToImport } = payload;
        const { transactions, wallet, tags, transactionTags, splitwiseTransactions } = yield call(importSplitwiseTransactions, integrationId, { transactionsToImport }, generateAuthenticationHeaders());

        yield put(importSplitwiseTransactionsSucceededAction({ transactions, wallet, tags, transactionTags, splitwiseTransactions }));

        toast(`${transactions.length} transactions imported.`);
    } catch (error) {
        yield put(importSplitwiseTransactionsErrorAction());
    }
}

export function* splitwiseIntegrationWatcher() {
    yield takeLatest(createSplitwiseIntegrationAction.type, createSplitwiseIntegrationWorker);
    yield takeLatest(fetchSplitwiseTransactionsAction.type, fetchSplitwiseTransactionsWorker);
    yield takeLatest(importSplitwiseTransactionsAction.type, importSplitwiseTransactionsWorker);
}