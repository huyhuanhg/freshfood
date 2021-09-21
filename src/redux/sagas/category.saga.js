import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FAILURE, CATEGORY_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';

function* getCategoryListSaga() {
  try {
    const { data } = yield axios.get(`${SERVER_CLIENT_API_URL}/categories`);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: e.message,
    });
  }
}

function* createCategorySaga({ payload }) {
  try {
    const { data } = payload,
      { data: response } = yield axios.post(`${SERVER_CLIENT_API_URL}/categories`, data);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.CREATE_CATEGORY),
      payload: {
        data: camelCaseKeys(response, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.CREATE_CATEGORY),
      payload: e.message,
    });
  }
}

function* editCategorySaga({ payload }) {
  try {
    const { id, data } = payload,
      { data: dataResponse } = yield axios.patch(
        `${SERVER_CLIENT_API_URL}/categories/${id}`,
        data,
      );
    yield put({
      type: SUCCESS(CATEGORY_ACTION.EDIT_CATEGORY),
      payload: {
        data: camelCaseKeys(dataResponse, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.EDIT_CATEGORY),
      payload: e.message,
    });
  }
}

function* deleteCategorySaga({ payload }) {
  try {
    const { id } = payload;
    yield axios.delete(`${SERVER_CLIENT_API_URL}/categories/${id}`);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.DELETE_CATEGORY),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.DELETE_CATEGORY),
      payload: e.message,
    });
  }
}

export default function* todoSaga() {
  yield takeEvery(REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST), getCategoryListSaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.CREATE_CATEGORY), createCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.EDIT_CATEGORY), editCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.DELETE_CATEGORY), deleteCategorySaga);
}
