import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SAVE_USER } from './constants';
import { saveUserFail } from './actions';

function makeRequest(user) {
    return axios.post('http://localhost:3000/users/registration', user)
        .then((r) => r.data)
        .catch((e) => e);
}

function* saveUserData({ user }) {
    const response = yield call(makeRequest, user);
    if (response.success)
        yield put(push('/login'));
    else
        yield put(saveUserFail(response.message));
}

function* registrationSaga() {
    yield takeLatest(SAVE_USER, saveUserData);
}

export default [
    registrationSaga
];
