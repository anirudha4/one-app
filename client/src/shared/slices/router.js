import { createSlice } from "@reduxjs/toolkit";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// actions
const locationChangeAction = (state, action) => {   
    state.location = action.payload
}

const routerSlice = createSlice({
    name: 'router',
    initialState: {
        location: history.location,
    },
    reducers: {
        locationChange: locationChangeAction
    }
});

export default routerSlice.reducer;

export const { locationChange } = routerSlice.actions;