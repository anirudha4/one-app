import socket from "./socket";

const BASE_URL = '/integrations/splitwise';

export const createSplitwiseIntegration = (data, headers) => socket.post(`${BASE_URL}`, data, headers);