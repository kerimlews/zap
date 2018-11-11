import { mapQuestions } from './models';
import {
    FETCH_MY_QUESTIONS,
    FETCH_MY_QUESTIONS_FAIL,
    FETCH_MY_QUESTIONS_SUCCESS,
    CLEAR_STATE,
    SAVE_QUESTION,
    SAVE_QUESTION_FAIL
} from './constants';

const initialState = {
    isLoading: false,
    questions: [],
    errorMessage: ''
};

function handleMyQuestions(state) {
    return {
        ...state,
        isLoading: true,
        errorMessage: ''
    };
}

function handleMyQuestionsSuccess(state, action) {
    return {
        isLoading: false,
        questions: state.questions.concat(mapQuestions(action.data)),
        errorMessage: ''
    };
}

function handleMyQuestionsFail(state, action) {
    return {
        ...state,
        isLoading: false,
        errorMessage: action.data || 'Error while loading data !'
    };
}

function handleSaveQuestionFail(state, action) {
    return {
        ...state,
        isLoading: false,
        errorMessage: action.data || 'Error while saving data !'
    };
}

function handleSaveQuestion(state) {
    return {
        ...state,
        isLoading: true,
        errorMessage: ''
    };
}

function handleClearState() {
    return {
        isLoading: false,
        questions: [],
        errorMessage: ''
    };
}


function myQuestionsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_QUESTIONS:
            return handleMyQuestions(state, action);
        case FETCH_MY_QUESTIONS_SUCCESS:
            return handleMyQuestionsSuccess(state, action);
        case FETCH_MY_QUESTIONS_FAIL:
            return handleMyQuestionsFail(state, action);
        case CLEAR_STATE:
            return handleClearState();
        case SAVE_QUESTION:
            return handleSaveQuestion(state);
        case SAVE_QUESTION_FAIL:
            return handleSaveQuestionFail(state, action);
        default:
            return state;
    }
}

export default myQuestionsReducer;
