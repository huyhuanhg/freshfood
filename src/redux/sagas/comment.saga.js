import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, COMMENT_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';
import history from '../../utils/history';

function* getCommentsSaga({ payload }) {
  try {
    const storeId = payload?.storeId,
      userId = payload?.userId,
      page = payload?.page,
      params = {
        ...storeId && { store: storeId },
        ...userId && { userId },
        ...page && { page },
      },
      { data } = yield axios({
        method: 'GET',
        url: `${SERVER_CLIENT_API_URL}/comment`,
        params: toSnakeCase(params),
      });
    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: { error: e.message },
    });
  }
}

function* createCommentSaga({ payload }) {
  try {
    const { slug, description, paths, accessToken, firstName, lastName, userAvatar } = payload,
      storeId = slug.slice(slug.lastIndexOf('.') + 1),
      data = { storeId, paths, content: description },
      { data: dataResponse } = yield axios({
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
          ...camelCaseKeys(dataResponse, { deep: true }),
          firstName,
          lastName,
          userAvatar,
          pictures: [...paths],
        },
      },
    });
    yield history.push(`/stores/${slug}/comment`);
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
