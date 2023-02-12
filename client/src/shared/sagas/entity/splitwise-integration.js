import { call, put, takeLatest } from "redux-saga/effects";
import { createSplitwiseIntegration } from "../../../api/splitwise-integration";
import { generateAuthenticationHeaders } from "../../../utils/authentication";
import { createSplitwiseIntegrationAction, createSplitwiseIntegrationSucceededAction } from '../../actions/entry/splitwise-integrations';

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

export function* splitwiseIntegrationWatcher() {
    yield takeLatest(createSplitwiseIntegrationAction.type, createSplitwiseIntegrationWorker);
}