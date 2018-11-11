import axios from 'axios';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CHNAGE_LIKE,
    FETCH_LATEST_QUESTIONS,
    FETCH_QUESTIONS_WITH_MOST_LIKES,
    FETCH_USERS_WITH_MOST_ANSWERS
} from './constants';
import {
    changeLikeFail,
    changeLikeSuccess,
    fetchLatestQuestionsFail,
    fetchLatestQuestionsSuccess,
    fetchQuestionsWithMostLikesSuccess,
    fetchQuestionsWithMostLikesFail,
    fetchUsersWithMostAnswersSuccess,
    fetchUsersWithMostAnswersFail
} from './actions';

function makeLatestQuestionsRequest(loadcount) {
    return axios.post('http://localhost:3000/questions/latest', { loadcount })
        .then((r) => r.data)
        .catch((e) => e);
}

function makeLikesQuestionsRequest() {
    return axios.get('http://localhost:3000/questions/mostlikesquestions')
        .then((r) => r.data)
        .catch((e) => e);
}

function makeAnswerUsersRequest() {
    return axios.get('http://localhost:3000/users/userAnswers')
        .then((r) => r.data)
        .catch((e) => e);
}

function makeLikeRequest() {
    return axios.post('http://localhost:3000/questions/userAnswers')
        .then((r) => r.data)
        .catch((e) => e);
}

function* latestQuestionsData({ loadcount }) {
    const response = yield call(makeLatestQuestionsRequest, loadcount);
    if (response.success) {
        yield put(fetchLatestQuestionsSuccess(response.data));
    } else {
        yield put(fetchLatestQuestionsFail(response.message));
    }
}

function* likesQuestionsData() {
    const response = yield call(makeLikesQuestionsRequest);
    if (response.success) {
        yield put(fetchQuestionsWithMostLikesSuccess(response.data));
    } else {
        yield put(fetchQuestionsWithMostLikesFail(response.message));
    }
}

function* answersUsersData({ token }) {
    const response = yield call(makeAnswerUsersRequest, token);
    if (response.success) {
        yield put(fetchUsersWithMostAnswersSuccess(response.data));
    } else {
        yield put(fetchUsersWithMostAnswersFail(response.message));
    }
}

function* changeLikeData({ id, like }) {
    const response = yield call(makeLikeRequest, id, like);
    if (response.success) {
        yield put(changeLikeSuccess({ id, like }));
    } else {
        yield put(changeLikeFail(response.message));
    }
}

function* homepageSaga() {
    yield all([
        takeLatest(CHNAGE_LIKE, changeLikeData),
        takeLatest(FETCH_LATEST_QUESTIONS, latestQuestionsData),
        takeLatest(FETCH_QUESTIONS_WITH_MOST_LIKES, likesQuestionsData),
        takeLatest(FETCH_USERS_WITH_MOST_ANSWERS, answersUsersData)
    ]);
}

export default [
    homepageSaga
];
