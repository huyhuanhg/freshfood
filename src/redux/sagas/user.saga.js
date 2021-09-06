import { notification } from 'antd';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';

import history from '../../utils/history';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';

function* loginSaga(action) {
  try {
    const { data } = action.payload;
    let result = yield axios.post(`${SERVER_CLIENT_API_URL}/login`, data);
    yield (result = camelCaseKeys(result.data, { deep: true }));
    yield (localStorage.userInfo = JSON.stringify({
      accessToken: result.accessToken,
      expires: result.expire,
    }));

    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.user,
      },
    });

    yield notification.success({
      message: 'Đăng nhập thành công!',
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.LOGIN),
      payload: {
        error: 'Email hoặc mật khẩu không đúng!',
      },
    });
  }
}

function* refreshSaga(action) {
  try {
    const { data } = action.payload;
    let result = yield axios({
      method: 'post',
      url: `${SERVER_CLIENT_API_URL}/refresh`,
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    yield (result = camelCaseKeys(result.data, { deep: true }));
    yield (localStorage.userInfo = JSON.stringify({
      accessToken: result.accessToken,
      expires: result.expire,
    }));
    yield put({
      type: SUCCESS(USER_ACTION.REFRESH_TOKEN),
      payload: {
        data: result.user,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.REFRESH_TOKEN),
      payload: {
        error: e.message,
      },
    });
  }
}

function* checkEmailExistsSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.post(`${SERVER_CLIENT_API_URL}/email-exist`, data);
    yield put({
      type: SUCCESS(USER_ACTION.CHECK_EMAIL_EXISTS),
    });
  } catch (error) {
    yield put({
      type: FAILURE(USER_ACTION.CHECK_EMAIL_EXISTS),
      payload: {
        status: error.response.status,
        ...(error.response.status === 403 && { error: 'Email đã tồn tại!' }),
      },
    });
  }
}

// eslint-disable-next-line require-yield
function* registerSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.post(`${SERVER_CLIENT_API_URL}/register`, toSnakeCase(data));
    yield put({ type: SUCCESS(USER_ACTION.REGISTER) });
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
    const { data } = action.payload;
    const result = yield axios({
      method: 'get',
      url: `${SERVER_CLIENT_API_URL}/user-profile`,
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.GET_USER_INFO),
      payload: {
        error: e.message,
      },
    });
  }
}

function* logoutSaga(action) {
  const { data } = action.payload;
  yield axios({
    method: 'post',
    url: `${SERVER_CLIENT_API_URL}/logout`,
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  yield localStorage.removeItem('userInfo');
  yield history.push('/login');
}

export default function* adminSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REFRESH_TOKEN), refreshSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHECK_EMAIL_EXISTS), checkEmailExistsSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.LOGOUT), logoutSaga);
}
