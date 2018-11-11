import {
    CHECK_TOKEN,
    CHECK_TOKEN_FAIL,
    CHECK_TOKEN_SUCCESS
} from './constants';

export function checkToken(token) {
    return {
        type: CHECK_TOKEN,
        token
    };
}

export function checkTokenSuccess(data) {
    return {
        type: CHECK_TOKEN_SUCCESS,
        data
    };
}

export function checkTokenFail() {
    return {
        type: CHECK_TOKEN_FAIL
    };
}
