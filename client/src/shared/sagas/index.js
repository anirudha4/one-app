import { call } from "redux-saga/effects";
import { coreSaga } from "./core";
export default function* rootSaga() {
    yield call(coreSaga);
}