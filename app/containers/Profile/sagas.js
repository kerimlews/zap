import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { SAVE_PASSWORD } from './constants';
import { savePasswordFail, savePasswordSuccess } from './actions';

const headers = {
    headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
    }
};

function makeRequest(id, password) {
    return axios.post('http://localhost:3000/users/savePassword', { id, password }, headers)
        .then((r) => r.data)
        .catch((e) => e);
}

function* savePasswordData({ id, password }) {
    try {
        const response = yield call(makeRequest, id, password);
        yield put(savePasswordSuccess(response));
    } catch (ex) {
        yield put(savePasswordFail(ex));
    }
}

function* profileSaga() {
    yield takeLatest(SAVE_PASSWORD, savePasswordData);
}

export default [
    profileSaga
];
