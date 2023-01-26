import socket from "./socket";

const BASE_URL = '/tags';

export const createTag = (data, headers) => socket.post(`${BASE_URL}`, data, headers);