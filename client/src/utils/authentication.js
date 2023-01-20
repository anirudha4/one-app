export const generateAuthenticationHeaders = (accessToken, headers = {}) => {
    return {
        ...headers,
        'Authorization': `Bearer ${accessToken}`
    }
}

export const getAccessTokenFromLocalStore = () => localStorage.getItem('token') ?? null;

export const setAccessTokenToLocalStore = (accessToken) => accessToken && localStorage.setItem('token', accessToken);

export const clearAccessTokenToLocalStore = () => localStorage.removeItem('token');