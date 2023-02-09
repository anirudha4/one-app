import socket from "./socket";

const BASE_URL = '/wallets';

export const updateWallet = (id, data, headers) => socket.put(`${BASE_URL}/${id}`, data, headers);