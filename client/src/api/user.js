import socket from "./socket";

const BASE_URL = '/users'
const LOGIN_BASE_URL = '/access-tokens'

/**
 * 
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.password
 * @param {object} headers 
 * @returns 
 */

export const register = (data, headers) => socket.post(`${BASE_URL}`, data, headers);

/**
 * 
 * @param {object} data
 * @param {string} data.email
 * @param {string} data.password
 * @param {object} headers 
 * @returns 
 */
export const generateAccessToken = (data, headers) => socket.post(`${LOGIN_BASE_URL}`, data, headers);

/**
 * 
 * @param {*} headers 
 * @returns 
 */
export const authorizeSelf = (headers) => socket.get(`${BASE_URL}/me`, undefined, headers);

