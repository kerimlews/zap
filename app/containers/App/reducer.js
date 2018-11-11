import {
    CHECK_TOKEN_SUCCESS,
    CHECK_TOKEN_FAIL
} from './constants';

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: {}
};

function handleCheckTokenSuccess(action) {
    return {
        isInitialized: true,
        isAuthenticated: true,
        user: action.data
    };
}

function handleCheckTokenFail() {
    return {
        isInitialized: true,
        isAuthenticated: false,
        user: {}
    };
}

function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_TOKEN_SUCCESS:
            return handleCheckTokenSuccess(action);
        case CHECK_TOKEN_FAIL:
            return handleCheckTokenFail();
        default:
            return state;
    }
}

export default appReducer;
