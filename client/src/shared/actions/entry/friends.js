import { createAction } from "@reduxjs/toolkit";

// create tag
export const createFriendAction = createAction('friends/create');
export const createFriendRequestedAction = createAction('friends/create/request');
export const createFriendSucceededAction = createAction('friends/create/success');
export const createFriendRecievedAction = createAction('friends/create/recieve');
export const createFriendErrorAction = createAction('friends/create/error');