import { call, put, takeLatest } from 'redux-saga/effects';
import { createTag } from '../../../api/tag';
import { generateAuthenticationHeaders } from '../../../utils/authentication';
import { createTagAction, createTagErrorAction, createTagSucceededAction } from '../../actions/entry/tags';

function* createTagWorker({ payload }) {
    try {
        const { tag } = yield call(createTag, payload, generateAuthenticationHeaders());
        yield put(createTagSucceededAction({ tag }));
    } catch (error) {
        yield put(createTagErrorAction({ error }));
    }
}

export function* tagWatcher() {
    yield takeLatest(createTagAction.type, createTagWorker)
}