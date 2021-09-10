import { fork } from 'redux-saga/effects';

import foodSaga from './food.saga';
import userSaga from './user.saga';
import categorySaga from './category.saga';
import adminSaga from './admin.saga';
import promotionSaga from './promotion.saga';
import storeSaga from './store.saga';
import cartSaga from './cart.saga';
import addressSaga from './address.saga';

export default function* rootSaga() {
  yield fork(foodSaga);
  yield fork(adminSaga);
  yield fork(userSaga);
  yield fork(cartSaga);
  yield fork(promotionSaga);
  yield fork(storeSaga);

  yield fork(categorySaga);
  yield fork(addressSaga);
}
