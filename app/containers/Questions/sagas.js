import axios from 'axios';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_ALL_ANSWERS,
    FETCH_ALL_QUESTIONS,
    SAVE_ANSWER,
    CHNAGE_LIKE_QUESTION,
    CHNAGE_LIKE_ANSWER
} from './constants';
import {
    fetchAllAnswers,
    changeLikeAnswerFail,
    changeLikeQuestionFail,
    fetchAllAnswersFail,
    fetchAllAnswersSuccess,
    fetchAllQuestionsFail,
    fetchAllQuestionsSuccess,
    fetchAllQuestions
} from './actions';

const headers = {
    Authorization: `jwt ${localStorage.getItem('token')}`
};

function makeQuestionsRequest() {
    return axios.get('http://localhost:3000/questions/allquestions')
        .then((r) => r.data)
        .catch((e) => e);
}

function makeAnswersRequest() {
    return axios.get('http://localhost:3000/questions/allanswers')
        .then((r) => r.data)
        .catch((e) => e);
}

function makeLikesQuestionsRequest(userId, questionId, like) {
    return axios.post('http://localhost:3000/questions/saveUserQuestion', { userId, questionId, like }, { headers })
        .then((r) => r.data)
        .catch((e) => e);
}

function makeLikesAnswersRequest(userId, answerId, like) {
    return axios.post('http://localhost:3000/answers/saveUserAnswer', { userId, answerId, like }, { headers })
        .then((r) => r.data)
        .catch((e) => e);
}

function makeSaveAnswersRequest(answer) {
    return axios.post('http://localhost:3000/answers/saveAnswer', { answer }, { headers })
        .then((r) => r.data)
        .catch((e) => e);
}

function* allQuestionsData() {
    const response = yield call(makeQuestionsRequest);
    if (response.success) {
        yield put(fetchAllQuestionsSuccess(response.data));
    } else {
        yield put(fetchAllQuestionsFail(response.message));
    }
}

function* allAnswersData() {
    const response = yield call(makeAnswersRequest);
    if (response.success) {
        yield put(fetchAllAnswersSuccess(response.data));
    } else {
        yield put(fetchAllAnswersFail(response.message));
    }
}

function* likesQuestionsData({ userId, questionId, like }) {
    const response = yield call(makeLikesQuestionsRequest, userId, questionId, like);
    if (response.success) {
        yield put(fetchAllQuestions());
    } else {
        yield put(changeLikeQuestionFail(response.message));
    }
}

function* likesAnswersData({ userId, answerId, like }) {
    const response = yield call(makeLikesAnswersRequest, userId, answerId, like);
    if (response.success) {
        yield put(fetchAllAnswers());
    } else {
        yield put(changeLikeAnswerFail(response.message));
    }
}

function* saveAnswerData({ data }) {
    const response = yield call(makeSaveAnswersRequest, data);
    if (response.success) {
        yield put(fetchAllAnswers());
    } else {
        yield put(changeLikeAnswerFail(response.message));
    }
}

function* questionsSaga() {
    yield all([
        takeLatest(CHNAGE_LIKE_ANSWER, likesAnswersData),
        takeLatest(CHNAGE_LIKE_QUESTION, likesQuestionsData),
        takeLatest(FETCH_ALL_ANSWERS, allAnswersData),
        takeLatest(FETCH_ALL_QUESTIONS, allQuestionsData),
        takeLatest(SAVE_ANSWER, saveAnswerData)
    ]);
}

export default [
    questionsSaga
];
