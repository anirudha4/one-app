import { createAction, createSlice } from "@reduxjs/toolkit";

// actions for init
export const appInit = createAction('app/init');

const coreSlice = createSlice({
    name: 'core',
    initialState: {
        isCoreInitializing: true
    },
    reducers: {
        coreInitialized: (state) => {
            state.isCoreInitializing = false
        }
    },
})

export default coreSlice.reducer;

export const { coreInitialized } = coreSlice.actions;