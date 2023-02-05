import { createAction, createSlice } from '@reduxjs/toolkit'
import { getAccessTokenFromLocalStore } from '../../utils/authentication';
import { updateUsersRecievedAction } from '../actions/entry/users';

// logout actions
export const requestLogout = createAction('/auth/logout');

// login actions
export const requestLogin = createAction('auth/login', function prepare(payload) {
    return {
        payload: {
            emailOrUsername: payload.email,
            password: payload.password
        }
    }
});
const loginRequested = (state) => {
    state.loading = true;
}
const loginAction = (state, action) => {
    state.isLoggedIn = true;
    state.currentUser = action.payload
    state.loading = false;
}
// register actions
export const requestRegister = createAction('auth/register');

const registerRequested = (state) => {
    state.loading = true;
}
const registerAction = (state) => {
    state.loading = false;
}

const updateUser = (state, action) => {
    state.currentUser = action.payload.user;
}

const initialState = {
    currentUser: null,
    isLoggedIn: false,
    accessToken: getAccessTokenFromLocalStore(),
    loading: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: loginAction,
        registerSuccess: registerAction,
    },
    extraReducers: {
        [requestRegister.type]: registerRequested,
        [requestLogin.type]: loginRequested,
        [updateUsersRecievedAction.type]: updateUser
    }
});

// exports
export default authSlice.reducer;
export const { loginSuccess, registerSuccess } = authSlice.actions;