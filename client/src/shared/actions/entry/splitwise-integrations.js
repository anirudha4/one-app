import { createAction } from "@reduxjs/toolkit";

// create tag
export const createSplitwiseIntegrationAction = createAction('splitwise-integrations/create');
export const createSplitwiseIntegrationRequestedAction = createAction('splitwise-integrations/create/request');
export const createSplitwiseIntegrationSucceededAction = createAction('splitwise-integrations/create/success');
export const createSplitwiseIntegrationRecievedAction = createAction('splitwise-integrations/create/recieve');
export const createSplitwiseIntegrationErrorAction = createAction('splitwise-integrations/create/error');