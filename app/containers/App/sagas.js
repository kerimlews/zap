import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CHECK_TOKEN } from './constants';
import { checkTokenSuccess, checkTokenFail } from './actions';

function makeRequest(token) {
    return axios.post('http://localhost:3000/home/verifyToken', { token })
        .then((r) => r.data)
        .catch((e) => e);
}

function* checkTokenData({ token }) {
    const response = yield call(makeRequest, token);
    if (response.isAuthenticated) {
        yield put(checkTokenSuccess({ id: response.id, username: response.username, email: response.email }));
    } else {
        yield put(checkTokenFail());
    }
}

function* appSaga() {
    yield takeLatest(CHECK_TOKEN, checkTokenData);
}

export default [
    appSaga
];
