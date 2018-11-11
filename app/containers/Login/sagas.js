import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { checkTokenSuccess } from 'containers/App/actions';
import { LOGIN } from './constants';
import { loginFail } from './actions';

function makeRequest(data) {
    return axios.post('http://localhost:3000/login', data)
        .then((r) => r.data)
        .catch((c) => c);
}

function* loginData({ data }) {
    const response = yield call(makeRequest, data);
    if (response.success) {
        localStorage.setItem('token', response.token);
        yield put(checkTokenSuccess({ id: response.id, username: response.username, email: response.email }));
        yield put(push('/profile'));
    } else {
        yield put(loginFail(response.message));
    }
}

function* loginSaga() {
    yield takeLatest(LOGIN, loginData);
}

export default [
    loginSaga
];
