import socket from "./socket";

const BASE_URL = '/integrations/splitwise';

export const createSplitwiseIntegration = (data, headers) => socket.post(`${BASE_URL}`, data, headers);

export const fetchSplitwiseTransactions = (id, data, headers) => socket.post(`${BASE_URL}/${id}/transactions`, data, headers);

export const fetchSplitwiseGroups = (id, headers) => socket.get(`${BASE_URL}/${id}/groups`, undefined, headers);