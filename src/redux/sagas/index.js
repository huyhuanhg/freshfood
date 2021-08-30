import {fork} from 'redux-saga/effects';

import productSaga from './product.saga';
import userSaga from './user.saga';
import categorySaga from './category.saga';
import adminSaga from "./admin.saga";

export default function* rootSaga() {
    yield fork(productSaga);
    yield fork(adminSaga);
    yield fork(userSaga);
    yield fork(categorySaga);
}
