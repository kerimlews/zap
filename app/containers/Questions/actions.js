import {
    CHNAGE_LIKE_ANSWER,
    CHNAGE_LIKE_ANSWER_FAIL,
    CHNAGE_LIKE_QUESTION,
    CHNAGE_LIKE_QUESTION_FAIL,
    FETCH_ALL_ANSWERS,
    FETCH_ALL_ANSWERS_FAIL,
    FETCH_ALL_ANSWERS_SUCCESS,
    FETCH_ALL_QUESTIONS,
    FETCH_ALL_QUESTIONS_FAIL,
    FETCH_ALL_QUESTIONS_SUCCESS,
    SAVE_ANSWER,
    SAVE_ANSWER_FAIL
} from './constants';

export function saveAnswer(data) {
    return {
        type: SAVE_ANSWER,
        data
    };
}

export function saveAnswerFail(data) {
    return {
        type: SAVE_ANSWER_FAIL,
        data
    };
}

export function changeLikeAnswer(userId, answerId, like) {
    return {
        type: CHNAGE_LIKE_ANSWER,
        userId,
        answerId,
        like
    };
}

export function changeLikeAnswerFail(data) {
    return {
        type: CHNAGE_LIKE_ANSWER_FAIL,
        data
    };
}

export function changeLikeQuestion(userId, questionId, like) {
    return {
        type: CHNAGE_LIKE_QUESTION,
        userId,
        questionId,
        like
    };
}

export function changeLikeQuestionFail(data) {
    return {
        type: CHNAGE_LIKE_QUESTION_FAIL,
        data
    };
}

export function fetchAllAnswers() {
    return {
        type: FETCH_ALL_ANSWERS
    };
}

export function fetchAllAnswersSuccess(data) {
    return {
        type: FETCH_ALL_ANSWERS_SUCCESS,
        data
    };
}

export function fetchAllAnswersFail(data) {
    return {
        type: FETCH_ALL_ANSWERS_FAIL,
        data
    };
}

export function fetchAllQuestions() {
    return {
        type: FETCH_ALL_QUESTIONS
    };
}

export function fetchAllQuestionsSuccess(data) {
    return {
        type: FETCH_ALL_QUESTIONS_SUCCESS,
        data
    };
}

export function fetchAllQuestionsFail(data) {
    return {
        type: FETCH_ALL_QUESTIONS_FAIL,
        data
    };
}
