import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_MY_QUESTIONS, SAVE_QUESTION } from './constants';
import {
    fetchMyQuestionsSuccess,
    fetchMyQuestionsFail,
    changeLikeFail,
    fetchMyQuestions
} from './actions';

const headers = {
    Authorization: `jwt ${localStorage.getItem('token')}`
};

function makeMyQuestionRequest(id, loadcount, modelength) {
    return axios.post('http://localhost:3000/questions/myquestions', { id, loadcount, modelength }, { headers })
        .then((r) => r.data)
        .catch((e) => e);
}

function saveQuestionRequest(data) {
    return axios.post('http://localhost:3000/questions/saveQuestion', data, { headers })
        .then((r) => r.data)
        .catch((e) => e);
}
function* myQuestionsData({ id, loadcount, modelength }) {
    const response = yield call(makeMyQuestionRequest, id, loadcount, modelength);
    if (response.success) {
        yield put(fetchMyQuestionsSuccess(response.data));
    } else {
        yield put(fetchMyQuestionsFail(response.data));
    }
}

function* saveQuestionData({ data }) {
    const response = yield call(saveQuestionRequest, data);
    if (response.success) {
        yield put(fetchMyQuestions(data.userId, 0));
    } else {
        yield put(changeLikeFail(response.message));
    }
}

function* myQuestionsSaga() {
    yield all([
        takeLatest(SAVE_QUESTION, saveQuestionData),
        takeLatest(FETCH_MY_QUESTIONS, myQuestionsData)
    ]);
}

export default [
    myQuestionsSaga
];
