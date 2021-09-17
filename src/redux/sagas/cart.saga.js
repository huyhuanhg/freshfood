import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, CART_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
// import { Button, message } from 'antd';
// import NumberFormat from 'react-number-format';

function* getCartListSaga(action) {
  try {
    const { accessToken } = action.payload.data;
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/carts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.GET_CART_LIST),
      payload: { error: e.message },
    });
  }
}

function* updateCartSaga({ payload }) {
  try {
    const { accessToken, food } = payload.data;
    const action = payload.data?.action;
    const result = yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/carts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        food,
        ...action && { action },
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.UPDATE_CART),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
    // yield message.open({
    //   content: (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         minWidth: 400,
    //       }}
    //     >
    //       <div
    //         style={{
    //           color: '#777',
    //           fontWeight: 700,
    //           display: 'flex',
    //           alignItems: 'center',
    //         }}
    //       >
    //         <img
    //           src={food}
    //           alt={''}
    //           style={{
    //             marginRight: 10,
    //             width: 64,
    //             height: 64,
    //           }}
    //         />
    //         <div style={{ textAlign: 'left' }}>
    //           <span>Phở đặc biệt</span>
    //           <p style={{ margin: 0, color: 'red' }}>
    //             <NumberFormat
    //               value={20000}
    //               displayType={'text'}
    //               thousandSeparator
    //               suffix={'đ'}
    //             />
    //           </p>
    //         </div>
    //       </div>
    //       <Button type='primary'>Xem giỏ hàng</Button>
    //     </div>),
    //   duration: 3,
    //   style: {
    //     marginTop: '61.188px',
    //   },
    // });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.UPDATE_CART),
      payload: { error: e.message },
    });
  }
}

function* deleteCartSaga(action) {
  try {
    const { accessToken } = action.payload.data;
    const food = action.payload.data?.food;
    const result = yield axios({
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
        data: camelCaseKeys({ ...result.data, ...food && { foodId: food } }, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.DESTROY_CART),
      payload: { error: e.message },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga);
  yield takeEvery(REQUEST(CART_ACTION.UPDATE_CART), updateCartSaga);
  yield takeEvery(REQUEST(CART_ACTION.DESTROY_CART), deleteCartSaga);
}
