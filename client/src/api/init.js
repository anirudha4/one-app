import socket from "./socket";

const BASE_URL = '/organizations/init';

/**
 * 
 * @param {object} headers
 * @returns 
 */

export const init = (headers) => socket.get(`${BASE_URL}`, undefined, headers);