import { createAction } from "@reduxjs/toolkit";

// create tag
export const createUsersAction = createAction('users/create');
export const createUsersRequestedAction = createAction('users/create/request');
export const createUsersSucceededAction = createAction('users/create/success');
export const createUsersRecievedAction = createAction('users/create/recieve');
export const createUsersErrorAction = createAction('users/create/error');

// update
export const updateUsersAction = createAction('users/update');
export const updateUsersRequestedAction = createAction('users/update/request');
export const updateUsersSucceededAction = createAction('users/update/success');
export const updateUsersRecievedAction = createAction('users/update/recieve');
export const updateUsersErrorAction = createAction('users/update/error');