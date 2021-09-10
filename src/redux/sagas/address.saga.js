import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, ADDRESS_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import { compactAddress } from '../../utils/address.js';

function* getAddressSaga(action) {
  try {
    const provinceCode = action.payload?.provinceCode;
    const districtCode = action.payload?.districtCode;

    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/address`,
      params: {
        ...provinceCode && { p: provinceCode },
        ...districtCode && { d: districtCode },
      },
    });
    yield put({
      type: SUCCESS(ADDRESS_ACTION.GET_ADDRESS),
      payload: {
        data: camelCaseKeys({
          wards: compactAddress(result.data.wards),
          districts: compactAddress(result.data.districts),
          provinces: compactAddress(result.data.provinces),
        }, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ADDRESS_ACTION.GET_ADDRESS),
      payload: { error: e.message },
    });
  }
}

function* getDistrictsSaga(action) {
  try {
    const provinceCode = action.payload.provinceCode;

    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/districts`,
      params: {
        p: provinceCode,
      },
    });
    yield put({
      type: SUCCESS(ADDRESS_ACTION.GET_DISTRICTS),
      payload: {
        data: camelCaseKeys(compactAddress(result.data), { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ADDRESS_ACTION.GET_DISTRICTS),
      payload: { error: e.message },
    });
  }
}

function* getWardsSaga(action) {
  try {
    const districtCode = action.payload.districtCode;

    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/wards`,
      params: {
        d: districtCode,
      },
    });
    yield put({
      type: SUCCESS(ADDRESS_ACTION.GET_WARDS),
      payload: {
        data: camelCaseKeys(compactAddress(result.data), { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ADDRESS_ACTION.GET_WARDS),
      payload: { error: e.message },
    });
  }
}

export default function* addressSaga() {
  yield takeEvery(REQUEST(ADDRESS_ACTION.GET_ADDRESS), getAddressSaga);
  yield takeEvery(REQUEST(ADDRESS_ACTION.GET_DISTRICTS), getDistrictsSaga);
  yield takeEvery(REQUEST(ADDRESS_ACTION.GET_WARDS), getWardsSaga);
}
