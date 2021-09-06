import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, CART_ACTION, FAILURE } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';

function* getCartListSaga(action) {
  try {
    const { data } = action.payload;
    console.log(data);
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/carts`,
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: FAILURE(CART_ACTION.GET_CART_LIST),
      payload: { error: e.message },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga);
}
