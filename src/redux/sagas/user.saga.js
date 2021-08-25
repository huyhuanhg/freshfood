import {notification} from "antd";
import {put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import {REQUEST, SUCCESS, FAILURE, USER_ACTION} from '../constants';
import {SERVER_CLIENT_API_URL} from './contants/apiUrl';

import history from '../../utils/history';

function* loginSaga(action) {
    try {
        const {data} = action.payload;
        const result = yield axios.post(`${SERVER_CLIENT_API_URL}/login`, data);
        yield localStorage.userInfo = JSON.stringify({
            access_token: result.data.access_token,
            expires: result.data.expires_in
        });

        yield put({
            type: SUCCESS(USER_ACTION.LOGIN),
            payload: {
                data: result.data.user,
            },
        });

        yield notification.success({
            message: 'Đăng nhập thành công!',
        });

        yield history.push('/');

    } catch (e) {
        yield put({
            type: FAILURE(USER_ACTION.LOGIN),
            payload: {
                error: 'Email hoặc mật khẩu không đúng!'
            }
        });
    }
}

function* refreshSaga(action) {
    try {
        const {data} = action.payload;
        const result = yield axios({
            method: 'post',
            url: `${SERVER_CLIENT_API_URL}/refresh`,
            headers: {
                Authorization: `Bearer ${data}`
            }
        });
        yield localStorage.userInfo = JSON.stringify({
            access_token: result.data.access_token,
            expires: result.data.expires_in
        });

        yield put({
            type: SUCCESS(USER_ACTION.REFRESH_TOKEN),
            payload: {
                data: result.data.user,
            },
        });
    } catch (e) {
        yield put({
            type: FAILURE(USER_ACTION.REFRESH_TOKEN),
            payload: {
                error : e.message
            }
        });
    }
}

function* checkEmailExistsSaga(action) {
    try {
        const {data} = action.payload;
        const result = yield axios.post(`${SERVER_CLIENT_API_URL}/email-exist`, data);
        yield put({
            type: SUCCESS(USER_ACTION.CHECK_EMAIL_EXISTS),
        });
    } catch (error) {
        yield put({
            type: FAILURE(USER_ACTION.CHECK_EMAIL_EXISTS),
            payload: {
                status: error.response.status,
                ...error.response.status === 403 && {error: 'Email đã tồn tại!'}
            }
        });
    }
}

function* registerSaga(action) {
    try {
        const {data} = action.payload;
        const result = yield axios.post(`${SERVER_CLIENT_API_URL}/register`, data);
        yield put({type: SUCCESS(USER_ACTION.REGISTER)});
        yield notification.success({
            message: 'Đăng ký thành công!',
        });
        yield history.push('/login');
    } catch (e) {
        yield notification.error({
            message: 'Đăng ký thất bại!',
        });
        yield put({
            type: FAILURE(USER_ACTION.REGISTER),
        });
    }
}

function* getInfoSaga(action) {
    try {
        const {data} = action.payload;
        const result = yield axios({
            method: 'get',
            url: `${SERVER_CLIENT_API_URL}/user-profile`,
            headers: {
                Authorization: `Bearer ${data}`
            }
        })
        yield put({
            type: SUCCESS(USER_ACTION.GET_USER_INFO),
            payload: {
                data: result.data
            },
        });
    } catch (e) {
        yield put({
            type: FAILURE(USER_ACTION.GET_USER_INFO),
            payload: {
                error : e.message
            }
        });
    }
}

export default function* adminSaga() {
    yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
    yield takeEvery(REQUEST(USER_ACTION.REFRESH_TOKEN), refreshSaga);
    yield takeEvery(REQUEST(USER_ACTION.CHECK_EMAIL_EXISTS), checkEmailExistsSaga);
    yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
    yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getInfoSaga);
}
