import socket from "./socket";

const BASE_URL = '/transactions';

export const createTransaction = (data, headers) => socket.post(`${BASE_URL}`, data, headers);