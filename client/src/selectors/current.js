import { createSelector as createReselectSelector } from '@reduxjs/toolkit';
import { createSelector } from 'redux-orm';
import orm from '../models/orm';

export const currentUserSelector = createReselectSelector(
    [(state) => state.auth],
    (auth) => {
        return auth.currentUser;
    }
)

export const currentAuthStatusSelector = createReselectSelector(
    [(state) => state.auth],
    (auth) => auth
)

export const currentOrganizationSelector = createSelector(
    orm,
    ({ Organization }) => {
        return Organization.first().ref;
    }
)