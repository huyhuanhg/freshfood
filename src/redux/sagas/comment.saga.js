import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, COMMENT_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';

function* getCommentsSaga(action) {
  try {
    const storeId = action.payload?.storeId;
    const userId = action.payload?.userId;
    const page = action.payload?.page;
    const params = {
      ...storeId && { store: storeId },
      ...userId && { userId },
      ...page && { page },
    };
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/comment`,
      params: toSnakeCase(params),
    });
    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: { error: e.message },
    });
  }
}

function* createCommentSaga(action) {
  try {
    const { storeId, description, paths, accessToken, firstName, lastName, userAvatar } = action.payload;
    const data = { storeId, paths, content: description };
    const result = yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/comment`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(COMMENT_ACTION.CREATE_COMMENT),
      payload: {
        data: {
          ...camelCaseKeys(result.data, { deep: true }),
          firstName,
          lastName,
          userAvatar,
          pictures: [...paths],
        },
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(COMMENT_ACTION.CREATE_COMMENT),
      payload: { error: e.message },
    });
  }
}

export default function* commentSaga() {
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), getCommentsSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.CREATE_COMMENT), createCommentSaga);
}
