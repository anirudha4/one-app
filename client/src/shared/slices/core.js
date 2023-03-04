import { createAction, createSlice } from "@reduxjs/toolkit";

// actions for init
export const appInit = createAction('app/init');

const coreSlice = createSlice({
    name: 'core',
    initialState: {
        isCoreInitializing: true,
        showFilterPopup: false,
    },
    reducers: {
        coreInitialized: (state) => {
            state.isCoreInitializing = false
        },
        toggleFilterPopup: (state) => {
            state.showFilterPopup = !state.showFilterPopup
        },
        changeFilterPopupState: (state, action) => {
            state.showFilterPopup = action.payload;
        },

    },
})

export default coreSlice.reducer;

export const { coreInitialized, toggleFilterPopup, changeFilterPopupState } = coreSlice.actions;