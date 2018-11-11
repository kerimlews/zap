import {
    FETCH_MY_QUESTIONS,
    FETCH_MY_QUESTIONS_FAIL,
    FETCH_MY_QUESTIONS_SUCCESS,
    CLEAR_STATE,
    SAVE_QUESTION,
    SAVE_QUESTION_FAIL
} from './constants';

export function saveQuestion(data) {
    return {
        type: SAVE_QUESTION,
        data
    };
}

export function saveQuestionFail(data) {
    return {
        type: SAVE_QUESTION_FAIL,
        data
    };
}

export function fetchMyQuestions(id, loadcount, modelength) {
    return {
        type: FETCH_MY_QUESTIONS,
        id,
        loadcount,
        modelength
    };
}

export function fetchMyQuestionsSuccess(data) {
    return {
        type: FETCH_MY_QUESTIONS_SUCCESS,
        data
    };
}

export function fetchMyQuestionsFail(data) {
    return {
        type: FETCH_MY_QUESTIONS_FAIL,
        data
    };
}

export function clearState() {
    return {
        type: CLEAR_STATE
    };
}
