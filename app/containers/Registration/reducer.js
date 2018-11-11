import {
    SAVE_USER,
    SAVE_USER_FAIL,
    RESET_STATE
} from './constants';

const initialState = {
    errorMessage: '',
    isLoading: false
};

function handleSaveUser(state) {
    return {
        ...state,
        errorMessage: '',
        isLoading: true
    };
}

function handleSaveUserFail(state, action) {
    return {
        ...state,
        errorMessage: action.data,
        isLoading: false
    };
}

function handleResetState(state) {
    return {
        ...state,
        errorMessage: '',
        isLoading: false
    };
}

function registrationReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER:
            return handleSaveUser(state);
        case SAVE_USER_FAIL:
            return handleSaveUserFail(state, action);
        case RESET_STATE:
            return handleResetState(state);
        default:
            return state;
    }
}

export default registrationReducer;
