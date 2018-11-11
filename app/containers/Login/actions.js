import {
    LOGIN,
    LOGIN_FAIL,
    RESET_STATE
} from './constants';

export function login(data) {
    return {
        type: LOGIN,
        data
    };
}

export function loginFail(data) {
    return {
        type: LOGIN_FAIL,
        data
    };
}

export function resetState() {
    return {
        type: RESET_STATE
    };
}
