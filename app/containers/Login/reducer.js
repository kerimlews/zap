import {
    LOGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    RESET_STATE
} from './constants';

const initialState = {
    isLoading: false,
    errorMessage: ''
};

function handleLogin(state) {
    return {
        ...state,
        isLoading: true,
        errorMessage: ''
    };
}

function handleLoginSuccess(state, action) {
    return {
        ...state,
        user: action.data,
        isLoading: false,
        errorMessage: ''
    };
}

function handleLoginFail(state, action) {
    return {
        ...state,
        isLoading: false,
        errorMessage: action.data
    };
}

function handleResetState(state) {
    return {
        ...state,
        isLoading: false,
        errorMessage: ''
    };
}

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return handleLogin(state);
        case LOGIN_SUCCESS:
            return handleLoginSuccess(state, action);
        case LOGIN_FAIL:
            return handleLoginFail(state, action);
        case RESET_STATE:
            return handleResetState(state);
        default:
            return state;
    }
}

export default loginReducer;
