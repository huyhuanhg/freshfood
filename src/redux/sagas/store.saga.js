import {put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import {REQUEST, SUCCESS, FAILURE, STORE_ACTION} from '../constants';
import {SERVER_CLIENT_API_URL} from '../../contants';

function* getStoreListSaga() {
    try {
        const result = yield axios({
            method: 'GET',
            url: `${SERVER_CLIENT_API_URL}/stores`
        });
        yield put({
            type: SUCCESS(STORE_ACTION.GET_STORE_LIST),
            payload: {
                data: result.data
            },
        });
    } catch (e) {
        // yield put({ type: FAILURE(FOOD_ACTION.GET_FOOD_LIST_INITIAL), payload: e.message });
    }
}

export default function* storeSaga() {
    yield takeEvery(REQUEST(STORE_ACTION.GET_STORE_LIST), getStoreListSaga);
}
