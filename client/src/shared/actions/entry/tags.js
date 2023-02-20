import { createAction } from "@reduxjs/toolkit";

// create friend
export const createTagAction = createAction('tags/create');
export const createTagRequestedAction = createAction('tags/create/request');
export const createTagSucceededAction = createAction('tags/create/success');
export const createTagRecievedAction = createAction('tags/create/recieve');
export const createTagErrorAction = createAction('tags/create/error');