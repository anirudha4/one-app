import { createAction } from "@reduxjs/toolkit";

// create tag
export const updateWalletsAction = createAction('wallets/update');
export const updateWalletsRequestedAction = createAction('wallets/update/request');
export const updateWalletsSucceededAction = createAction('wallets/update/success');
export const updateWalletsRecievedAction = createAction('wallets/update/recieve');
export const updateWalletsErrorAction = createAction('wallets/update/error');