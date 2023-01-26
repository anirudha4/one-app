import { createSlice } from "@reduxjs/toolkit";
import { createTagAction, createTagErrorAction, createTagSucceededAction } from "../actions/entry/tags";

const tagSlice = createSlice({
    name: 'tag',
    initialState: {
        addingTagLoader: false
    },
    reducers: {},
    extraReducers: {
        [createTagAction.type]: (state) => {
            state.addingTagLoader = true
        },
        [createTagSucceededAction.type]: (state) => {
            state.addingTagLoader = false
        },
        [createTagErrorAction.type]: (state) => {
            state.addingTagLoader = false
        },
    }
})

export default tagSlice.reducer;

export const { addingTagLoader } = tagSlice.actions;