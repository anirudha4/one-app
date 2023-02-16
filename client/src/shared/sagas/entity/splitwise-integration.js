import { call, put, takeLatest } from "redux-saga/effects";
import { createSplitwiseIntegration, fetchSplitwiseTransactions } from "../../../api/splitwise-integration";
import { generateAuthenticationHeaders } from "../../../utils/authentication";
import { createSplitwiseIntegrationAction, createSplitwiseIntegrationSucceededAction, fetchSplitwiseTransactionsAction, fetchSplitwiseTransactionsErrorAction, fetchSplitwiseTransactionsSucceededAction } from '../../actions/entry/splitwise-integrations';

function* createSplitwiseIntegrationWorker({ payload }) {
    try {
        const { splitwiseIntegration } = yield call(createSplitwiseIntegration, payload, generateAuthenticationHeaders());
        yield put(createSplitwiseIntegrationSucceededAction({ splitwiseIntegration }));

        // navigate to splitwise integration page
        window.location.href = `http://localhost:5173/app/integrations/splitwise/${splitwiseIntegration.id}`;
    } catch (err) {
        console.log(err);
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
export function* splitwiseIntegrationWatcher() {
    yield takeLatest(createSplitwiseIntegrationAction.type, createSplitwiseIntegrationWorker);
    yield takeLatest(fetchSplitwiseTransactionsAction.type, fetchSplitwiseTransactionsWorker);
}