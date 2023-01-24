import { ERROR_CODES } from "../constants/errors";

export const generateAuthenticationHeaders = (accessToken, headers = {}) => {
    return {
        ...headers,
        'Authorization': `Bearer ${accessToken}`
    }
}

export const getAccessTokenFromLocalStore = () => localStorage.getItem('token') ?? null;

export const setAccessTokenToLocalStore = (accessToken) => accessToken && localStorage.setItem('token', accessToken);

export const clearAccessTokenToLocalStore = () => localStorage.removeItem('token');

export const handleAuthenticationErrorCodes = (code) => {
    if (code == '9001') {
        window.location.href = '/auth?existing_user=true'
    }
    return ERROR_CODES[code];
}