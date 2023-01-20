import { call, put, takeLatest } from 'redux-saga/effects';
import { createAction } from "@reduxjs/toolkit"
import { authorizeSelf, generateAccessToken, register } from '../../api/user';
import { loginSuccess, registerSuccess } from '../../shared/slices/auth';
import { clearAccessTokenToLocalStore, generateAuthenticationHeaders, setAccessTokenToLocalStore } from '../../utils/authentication';

export const requestRegister = createAction('auth/register');

export const requestLogin = createAction('auth/login', function prepare(payload) {
  return {
    payload: {
      emailOrUsername: payload.email,
      password: payload.password
    }
  }
});

export const requestLogout = createAction('/auth/logout');

/**
 * 
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.email
 * @param {string} data.payload.name
 * @param {string} data.payload.password
 */

export function* registerWorker({ payload }) {
  try {
    yield call(register, payload);
    yield put(registerSuccess(payload));
  } catch (err) {
    console.error(err.message);
  }
}
/**
 * 
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.email
 * @param {string} data.payload.password
 */

export function* loginWorker({ payload }) {
  try {
    // get access token
    const { item: accessToken } = yield call(generateAccessToken, payload);
    // get user from access token
    yield call(authorize, accessToken);
    // store the access token in local storage
    yield call(setAccessTokenToLocalStore, accessToken);
  } catch (err) {
    console.log(err.message);
  }
}

export function* logoutWorker() {
  yield call(clearAccessTokenToLocalStore);
  window.location.href = '/auth';
}

export function* authWatcher() {
  yield takeLatest(requestRegister.type, registerWorker);
  yield takeLatest(requestLogin.type, loginWorker);
  yield takeLatest(requestLogout.type, logoutWorker);
}

export function* authorize(accessToken) {
  const { item: user } = yield call(authorizeSelf, generateAuthenticationHeaders(accessToken));
  yield put(loginSuccess(user));
  return user;
}