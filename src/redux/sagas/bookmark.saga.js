import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, BOOKMARK_ACTION, SUCCESS, FAILURE } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';
import { notification } from 'antd';

function* getBookmarkDetailSaga(action) {
  try {
    const { data, accessToken } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/bookmark/${data.storeId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL),
      payload: {
        data: camelCaseKeys(result.data),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL),
      payload: { error: e.message },
    });
  }
}

function* updateBookmarkSaga(action) {
  try {
    const { data, accessToken } = action.payload;
    yield axios({
      method: 'PATCH',
      url: `${SERVER_CLIENT_API_URL}/bookmark`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(BOOKMARK_ACTION.UPDATE_BOOKMARK),
      payload: {
        data,
      },
    });
    yield notification.success({
      message: 'Sửa bộ sưu tập thành công',
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKMARK_ACTION.UPDATE_BOOKMARK),
      payload: { error: e.message },
    });
  }
}
function* createBookmarkSaga(action) {
  try {
    const { data, accessToken } = action.payload;
    yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/bookmark`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(BOOKMARK_ACTION.CREATE_BOOKMARK),
    });
    yield notification.success({
      message: 'Thêm vào bộ sưu tập thành công',
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKMARK_ACTION.CREATE_BOOKMARK),
      payload: { error: e.message },
    });
  }
}

export default function* bookmarkSaga() {
  yield takeEvery(REQUEST(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL), getBookmarkDetailSaga);
  yield takeEvery(REQUEST(BOOKMARK_ACTION.UPDATE_BOOKMARK), updateBookmarkSaga);
  yield takeEvery(REQUEST(BOOKMARK_ACTION.CREATE_BOOKMARK), createBookmarkSaga);
}
