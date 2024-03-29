import { all, apply, call, fork, put } from "redux-saga/effects";
import socket from "../../api/socket";
import { authorize, authWatcher } from "../../pages/Auth/saga";
import { getAccessTokenFromLocalStore } from "../../utils/authentication";
import { coreInitialized } from "../slices/core";
import { friendWatcher } from "./entity/friend";
import { memberWatcher } from "./entity/member";
import { splitwiseIntegrationWatcher } from "./entity/splitwise-integration";
import { tagWatcher } from "./entity/tag";
import { transactionWatcher } from "./entity/transaction";
import { walletWatcher } from "./entity/wallets";
import { loadDataForOrganization } from "./init";
import socketWatchers from "./socket-event-channel";

const watchers = [
    authWatcher,
    tagWatcher,
    transactionWatcher,
    memberWatcher,
    walletWatcher,
    friendWatcher,
    splitwiseIntegrationWatcher,
    socketWatchers
]
export function* coreSaga() {
    yield all(watchers.map((watcher) => fork(watcher)));
    yield apply(socket, socket.connect);

    // check if access token is present
    const accessToken = yield call(getAccessTokenFromLocalStore);
    if (accessToken) {
        yield call(authorize, accessToken);
        yield call(loadDataForOrganization, accessToken);
    }
    yield put(coreInitialized());
}