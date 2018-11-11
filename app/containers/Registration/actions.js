import {
    SAVE_USER,
    SAVE_USER_FAIL,
    RESET_STATE
} from './constants';

export function saveUser(user) {
    return {
        type: SAVE_USER,
        user
    };
}

export function saveUserFail(data) {
    return {
        type: SAVE_USER_FAIL,
        data
    };
}

export function resetState() {
    return {
        type: RESET_STATE
    };
}
