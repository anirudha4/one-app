import { call, put, takeLatest } from 'redux-saga/effects';
import { createTransaction } from '../../../api/transaction';
import { generateAuthenticationHeaders } from '../../../utils/authentication';
import {
    createTransactionAction,
    createTransactionSucceededAction,
    createTransactionErrorAction
} from '../../actions/entry/transactions';

function* createTransactionWorker({ payload }) {
    try {
        const { transaction, transactionTags } = yield call(createTransaction, payload, generateAuthenticationHeaders());
        yield put(createTransactionSucceededAction({ transaction, transactionTags }));
    } catch (error) {
        yield put(createTransactionErrorAction(error));
    }
}

export function* transactionWatcher() {
    yield takeLatest(createTransactionAction.type, createTransactionWorker)
}