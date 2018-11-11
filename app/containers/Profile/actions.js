import {
    SAVE_PASSWORD,
    SAVE_PASSWORD_FAIL,
    SAVE_PASSWORD_SUCCESS,
    CLEAR_STATE
} from './constants';

export function savePassword(id, password) {
    return {
        type: SAVE_PASSWORD,
        id,
        password
    };
}

export function savePasswordSuccess(data) {
    return {
        type: SAVE_PASSWORD_SUCCESS,
        data
    };
}

export function savePasswordFail(data) {
    return {
        type: SAVE_PASSWORD_FAIL,
        data
    };
}

export function clearState() {
    return {
        type: CLEAR_STATE
    };
}
