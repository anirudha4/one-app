import socket from "./socket";

const BASE_URL = '/transactions';

export const createTransaction = (data, headers) => socket.post(`${BASE_URL}`, data, headers);

export const deleteTransaction = (id, headers) => socket.delete(`${BASE_URL}/${id}`, undefined, headers);

export const bulkDeleteTransaction = (data, headers) => socket.delete(`${BASE_URL}/bulk/delete`, data, headers);