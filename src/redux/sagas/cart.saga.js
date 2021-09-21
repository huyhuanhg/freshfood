import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, CART_ACTION, FAILURE, SUCCESS } from '../constants';
import { ROOT_PATH, SERVER_CLIENT_API_URL } from '../../contants';
import { Button, message } from 'antd';
import NumberFormat from 'react-number-format';
import history from '../../utils/history';

function* getCartListSaga({ payload: { data: { accessToken } } }) {
  try {
    const { data } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/carts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.GET_CART_LIST),
      payload: { error: e.message },
    });
  }
}

function* updateCartSaga({ payload: { data: { accessToken, action, food, isDisplayMessage } } }) {
  try {
    const { data: responseData } = yield axios({
        method: 'POST',
        url: `${SERVER_CLIENT_API_URL}/carts`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          food,
          ...action && { action },
        },
      }),
      data = camelCaseKeys(responseData, { deep: true });
    yield put({
      type: SUCCESS(CART_ACTION.UPDATE_CART),
      payload: {
        data: {
          ...data,
          isDisplayMessage,
        },
      },
    });
    const { cartUpdate, totalMoney } = data;
    if (isDisplayMessage) {
      yield message.open({
        content: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minWidth: 400,
            }}
          >
            <div
              style={{
                color: '#777',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={`${ROOT_PATH}${cartUpdate.foodImage}`}
                alt={''}
                style={{
                  marginRight: 10,
                  width: 64,
                  height: 64,
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <span>{cartUpdate.foodName}</span>
                <p style={{ margin: 0, color: 'red' }}>
                  <span style={{ color: '#888' }}>Tổng tiền: </span>
                  <NumberFormat
                    value={totalMoney}
                    displayType={'text'}
                    thousandSeparator
                    suffix={'đ'}
                  />
                </p>
              </div>
            </div>
            <Button type='primary' onClick={() => history.push('/cart')}>Xem giỏ hàng</Button>
          </div>),
        duration: 3,
        style: {
          marginTop: '61.188px',
        },
      });
    }
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.UPDATE_CART),
      payload: { error: e.message, data: food },
    });
  }
}

function* deleteCartSaga({ payload: { data: { accessToken, food } } }) {
  try {
    const { data } = yield axios({
      method: 'DELETE',
      url: `${SERVER_CLIENT_API_URL}/carts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ...food && { food },
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.DESTROY_CART),
      payload: {
        data: camelCaseKeys({ ...data, ...food && { foodId: food } }, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.DESTROY_CART),
      payload: { error: e.message, data: food },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga);
  yield takeEvery(REQUEST(CART_ACTION.UPDATE_CART), updateCartSaga);
  yield takeEvery(REQUEST(CART_ACTION.DESTROY_CART), deleteCartSaga);
}
