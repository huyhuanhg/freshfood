import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, LIKE_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';

function* getLikesSaga(action) {
  try {
    const { data, accessToken, type } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/like`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(LIKE_ACTION.GET_LIKE_LIST),
      payload: {
        data: camelCaseKeys(result.data),
        type,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(LIKE_ACTION.GET_LIKE_LIST),
      payload: { error: e.message },
    });
  }
}

function* toogleLikeSaga(action) {
  try {
    const { data, accessToken } = action.payload;
    yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/like`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(LIKE_ACTION.TOGGLE_LIKE),
      payload: {
        data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(LIKE_ACTION.TOGGLE_LIKE),
      payload: { error: e.message },
    });
  }
}

export default function* likeSaga() {
  yield takeEvery(REQUEST(LIKE_ACTION.GET_LIKE_LIST), getLikesSaga);
  yield takeEvery(REQUEST(LIKE_ACTION.TOGGLE_LIKE), toogleLikeSaga);
}
