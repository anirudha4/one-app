import { createSelector } from '@reduxjs/toolkit';

export const currentUserSelector = createSelector(
    [(state) => state.auth],
    (auth) => {
        return auth.currentUser;
    }
)

export const currentAuthStatusSelector = createSelector(
    [(state) => state.auth],
    (auth) => auth
)