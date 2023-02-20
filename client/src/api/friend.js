import socket from "./socket";

const BASE_URL = '/friends';

export const createFriend = (data, headers) => socket.post(`${BASE_URL}`, data, headers);