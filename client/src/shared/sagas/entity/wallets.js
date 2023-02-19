import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updateWallet } from "../../../api/wallet";
import { generateAuthenticationHeaders } from "../../../utils/authentication";
import { updateWalletsAction, updateWalletsSucceededAction } from "../../actions/entry/wallets";

function* updateWalletWorker({ payload }) {
    try {
        const { item } = yield call(updateWallet, payload.id, payload, generateAuthenticationHeaders());
        yield put(updateWalletsSucceededAction(item));

        toast('Wallet updated');
    } catch (error) {
        console.log(error.message);
    }
}

export function* walletWatcher() {
    yield takeLatest(updateWalletsAction.type, updateWalletWorker)
}