import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, ORDER_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';
import history from '../../utils/history';
import { notification } from 'antd';

function* createOrderSaga(action) {
  try {
    const { data, accessToken } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/order`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.CREATE_ORDER),
      payload: {
        data: camelCaseKeys(result.data),
      },
    });
    yield history.push('/profile/order');
    yield notification.success({
      message: 'Đặt hàng thành công!',
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.CREATE_ORDER),
      payload: { error: e.message },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.CREATE_ORDER), createOrderSaga);
}
