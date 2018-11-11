import {
    SAVE_PASSWORD,
    SAVE_PASSWORD_FAIL,
    SAVE_PASSWORD_SUCCESS,
    CLEAR_STATE
} from './constants';

const initialState = {
    isLoading: false,
    message: ''
};

function savePassword(state) {
    return {
        ...state,
        isLoading: true,
        message: ''
    };
}

function savePasswordSuccess(state, action) {
    return {
        ...state,
        isLoading: false,
        message: action.data.message
    };
}

function savePasswordFail(state, action) {
    return {
        ...state,
        isLoading: false,
        errorMessage: action.data
    };
}

function handleClearState(state) {
    return {
        ...state,
        isLoading: false,
        errorMessage: ''
    };
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_PASSWORD:
            return savePassword(state, action);
        case SAVE_PASSWORD_SUCCESS:
            return savePasswordSuccess(state, action);
        case SAVE_PASSWORD_FAIL:
            return savePasswordFail(state, action);
        case CLEAR_STATE:
            return handleClearState(state);
        default:
            return state;
    }
}

export default profileReducer;
