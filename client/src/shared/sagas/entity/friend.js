import { call, put, takeLatest } from 'redux-saga/effects';
import { createFriend } from '../../../api/friend';
import { generateAuthenticationHeaders } from '../../../utils/authentication';
import { createFriendAction, createFriendErrorAction, createFriendSucceededAction } from '../../actions/entry/friends';

function* createFriendWorker({ payload }) {
    try {
        const { friend } = yield call(createFriend, payload, generateAuthenticationHeaders());
        yield put(createFriendSucceededAction({ friend }));
    } catch (error) {
        yield put(createFriendErrorAction({ error }));
    }
}

export function* friendWatcher() {
    yield takeLatest(createFriendAction.type, createFriendWorker)
}