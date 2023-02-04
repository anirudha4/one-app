import { createAction } from "@reduxjs/toolkit";

// create tag
export const createMemberAction = createAction('members/create');
export const createMemberRequestedAction = createAction('members/create/request');
export const createMemberSucceededAction = createAction('members/create/success');
export const createMemberRecievedAction = createAction('members/create/recieve');
export const createMemberErrorAction = createAction('members/create/error');