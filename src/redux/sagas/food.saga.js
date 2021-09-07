import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FOOD_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import toSnakeCase from '../../utils/toSnakeCase';

function* getFoodListSaga(action) {
  try {
    const store = action.payload?.store;
    const tags = action.payload?.tags;
    const group = action.payload?.group;
    const sort = action.payload?.sort;
    const sortType = action.payload?.sortType;
    const user = action.payload?.user;
    const page = action.payload?.page;

    const params = {
      ...store && { store },
      ...tags && { tags: JSON.stringify(tags) },
      ...group && { group },
      ...sort && { sort, sortType },
      ...user && { user },
      ...page && { page },
    };
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/foods`,
      params: toSnakeCase(params),
    });
    yield put({
      type: SUCCESS(FOOD_ACTION.GET_FOOD_LIST),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
  } catch (e) {
    console.log(e.message);
    // yield put({ type: FAILURE(FOOD_ACTION.GET_FOOD_LIST_INITIAL), payload: e.message });
  }
}

function* getFoodPromotionSaga() {
  try {
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/food-promotions`,
    });
    yield put({
      type: SUCCESS(FOOD_ACTION.GET_FOOD_PROMOTIONS),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
  } catch (e) {
    // yield put({ type: FAILURE(FOOD_ACTION.GET_FOOD_LIST_INITIAL), payload: e.message });
  }
}

// function* getProductDetailSaga(action) {
//   try {
//     const { id } = action.payload;
//     const result = yield axios.get(`${SERVER_CLIENT_API_URL}/products/${id}?_expand=category`);
//     yield put({
//       type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
//       payload: {
//         data: result.data
//       },
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(PRODUCT_ACTION.GET_PRODUCT_DETAIL), payload: e.message });
//   }
// }
//
// function* createProductSaga(action) {
//   try {
//     const { data } = action.payload;
//     const result = yield axios.post(`${SERVER_CLIENT_API_URL}/products`, data);
//     yield put({
//       type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
//       payload: {
//         data: result.data,
//       },
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(PRODUCT_ACTION.CREATE_PRODUCT), payload: e.message });
//   }
// }
//
// function* editProductSaga(action) {
//   try {
//     const { id, data } = action.payload;
//     const result = yield axios.patch(`${SERVER_CLIENT_API_URL}/products/${id}`, data);
//     yield put({
//       type: SUCCESS(PRODUCT_ACTION.EDIT_PRODUCT),
//       payload: {
//         data: result.data,
//       }
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(PRODUCT_ACTION.EDIT_PRODUCT), payload: e.message });
//   }
// }
//
// function* deleteProductSaga(action) {
//   try {
//     const { id } = action.payload;
//     yield axios.delete(`${SERVER_CLIENT_API_URL}/products/${id}`);
//     yield put({
//       type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT),
//       payload: { id }
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(PRODUCT_ACTION.DELETE_PRODUCT), payload: e.message });
//   }
// }

export default function* foodSaga() {
  yield takeEvery(REQUEST(FOOD_ACTION.GET_FOOD_LIST), getFoodListSaga);
  yield takeEvery(REQUEST(FOOD_ACTION.GET_FOOD_PROMOTIONS), getFoodPromotionSaga);
  // yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL), getProductDetailSaga);
  // yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  // yield takeEvery(REQUEST(PRODUCT_ACTION.EDIT_PRODUCT), editProductSaga);
  // yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
}
