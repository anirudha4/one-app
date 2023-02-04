import socket from "./socket";

const BASE_URL = '/users/members'

export const createMember = (data, headers) => socket.post(`${BASE_URL}`, data, headers);