import { createSlice } from "@reduxjs/toolkit";

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