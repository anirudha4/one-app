import { all, apply, call, fork, put } from "redux-saga/effects";
import socket from "../../api/socket";
import { authorize, authWatcher } from "../../pages/Auth/saga";
import { getAccessTokenFromLocalStore } from "../../utils/authentication";
import { coreInitialized } from "../slices/core";
import socketWatchers from "./socket-event-channel";

const watchers = [
    authWatcher,
    socketWatchers
]
export function* coreSaga() {
    yield all(watchers.map((watcher) => fork(watcher)));
    yield apply(socket, socket.connect);

    // check if access token is present
    const accessToken = yield call(getAccessTokenFromLocalStore);
    if (accessToken) {
        yield call(authorize, accessToken);
    }
    yield put(coreInitialized());
}