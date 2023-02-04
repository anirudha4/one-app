import { call, put, select, takeLatest } from "redux-saga/effects";
import { createMemberAction, createMemberSucceededAction } from "../../actions/entry/member";
import { currentUserSelector } from '../../../selectors/current';
import { createMember } from "../../../api/member";
import { generateAuthenticationHeaders } from "../../../utils/authentication";

function* createMemberWorker({ payload }) {
    try {
        const { organizationId } = yield select(currentUserSelector);
        const memberValues = {
            ...payload.member,
            organizationId
        }
        const { member } = yield call(createMember, memberValues, generateAuthenticationHeaders());

        yield put(createMemberSucceededAction({ member }));
    } catch (error) {
        alert(error.message);
    }
}
export function* memberWatcher() {
    yield takeLatest(createMemberAction.type, createMemberWorker);
}