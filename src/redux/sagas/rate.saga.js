import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, RATE_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';

function* createRateSaga(action) {
  try {
    const { data, accessToken } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/rate`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    console.log(result);
    yield put({
      type: SUCCESS(RATE_ACTION.CREATE_RATE),
      payload: {
        data: camelCaseKeys({ avgRate: result.data, rate: data.rate }),
      },
    });
  } catch (e) {
    console.log(e.message);
    yield put({
      type: FAILURE(RATE_ACTION.CREATE_RATE),
      payload: { error: e.message },
    });
  }
}

export default function* rateSaga() {
  yield takeEvery(REQUEST(RATE_ACTION.CREATE_RATE), createRateSaga);
}
