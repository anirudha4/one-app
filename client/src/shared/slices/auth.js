import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { getAccessTokenFromLocalStore } from '../../utils/authentication';

// actions
const loginAction = (state, action) => {
    state.isLoggedIn = true;
    state.currentUser = action.payload
}
const registerAction = (state, action) => {
}



const initialState = {
    currentUser: null,
    isLoggedIn: false,
    accessToken: getAccessTokenFromLocalStore()
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: loginAction,
        registerSuccess: registerAction
    }
});

// exports
export default authSlice.reducer;
export const { loginSuccess, registerSuccess } = authSlice.actions;