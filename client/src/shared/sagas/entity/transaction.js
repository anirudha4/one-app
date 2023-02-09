import { call, put, takeLatest } from 'redux-saga/effects';
import { createTransaction, deleteTransaction } from '../../../api/transaction';
import { generateAuthenticationHeaders } from '../../../utils/authentication';
import {
    createTransactionAction,
    createTransactionSucceededAction,
    createTransactionErrorAction,
    deleteTransactionAction,
    deleteTransactionErrorAction,
    deleteTransactionSucceededAction
} from '../../actions/entry/transactions';

function* createTransactionWorker({ payload }) {
    try {
        const { transaction, transactionTags, transactionMembers, wallet } = yield call(createTransaction, payload, generateAuthenticationHeaders());
        yield put(createTransactionSucceededAction({ transaction, transactionTags, transactionMembers, wallet }));
    } catch (error) {
        yield put(createTransactionErrorAction(error));
    }
}

function* deleteTransactionWorker({ payload }) {
    try {
        const { transaction, wallet } = yield call(deleteTransaction, payload.id, generateAuthenticationHeaders())
        yield put(deleteTransactionSucceededAction({ transaction, wallet }));
    } catch (error) {
        yield put(deleteTransactionErrorAction(error));
    }
}

export function* transactionWatcher() {
    yield takeLatest(createTransactionAction.type, createTransactionWorker);
    yield takeLatest(deleteTransactionAction.type, deleteTransactionWorker);
}