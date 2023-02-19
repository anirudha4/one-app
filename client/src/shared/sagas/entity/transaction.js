import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { bulkDeleteTransaction, createTransaction, deleteTransaction } from '../../../api/transaction';
import { generateAuthenticationHeaders } from '../../../utils/authentication';
import {
    createTransactionAction,
    createTransactionSucceededAction,
    createTransactionErrorAction,
    deleteTransactionAction,
    deleteTransactionErrorAction,
    deleteTransactionSucceededAction,
    bulkDeleteTransactionAction,
    bulkDeleteTransactionSucceededAction,
    bulkDeleteTransactionErrorAction,
    bulkDeleteTransactionRequestedAction
} from '../../actions/entry/transactions';

function* createTransactionWorker({ payload }) {
    try {
        const { transaction, transactionTags, transactionMembers, wallet } = yield call(createTransaction, payload, generateAuthenticationHeaders());
        yield put(createTransactionSucceededAction({ transaction, transactionTags, transactionMembers, wallet }));

        toast('Transaction Created');
    } catch (error) {
        yield put(createTransactionErrorAction(error));
    }
}

function* deleteTransactionWorker({ payload }) {
    try {
        const { transaction, wallet } = yield call(deleteTransaction, payload.id, generateAuthenticationHeaders())
        yield put(deleteTransactionSucceededAction({ transaction, wallet }));

        toast('Transaction Deleted')
    } catch (error) {
        yield put(deleteTransactionErrorAction(error));
    }
}

function* bulkDeleteTransactionWorker({ payload }) {
    try {
        const { transactions, wallet } = yield call(bulkDeleteTransaction, payload, generateAuthenticationHeaders())
        yield put(bulkDeleteTransactionSucceededAction({ transactions, wallet }));

        toast(`${transactions.length} transactions deleted`);
    } catch (error) {
        yield put(bulkDeleteTransactionErrorAction(error));
    }
}

export function* transactionWatcher() {
    yield takeLatest(createTransactionAction.type, createTransactionWorker);
    yield takeLatest(deleteTransactionAction.type, deleteTransactionWorker);
    yield takeLatest(bulkDeleteTransactionAction.type, bulkDeleteTransactionWorker);
}