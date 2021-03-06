// Auth Actions
export const USER_LOGIN = 'USER_LOGIN';
export const USER_CHECK = 'USER_CHECK';
export const USER_LOGOUT = 'USER_LOGOUT';
// Auth States (for saga usage)
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const userLogin = (payload, pathName) => ({
    type: USER_LOGIN,
    payload,
    meta: { auth: true, pathName },
});

export const userCheck = (payload, pathName) => ({
    type: USER_CHECK,
    payload,
    meta: { auth: true, pathName },
});

export const userLogout = () => ({
    type: USER_LOGOUT,
    meta: { auth: true },
});
