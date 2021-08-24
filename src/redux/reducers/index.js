
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import userReducer from './user.reducer';
import commonReducer from './common.reducer';
import adminReducer from "./admin.reducer";

import rootSaga from '../sagas';

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userReducer,
    commonReducer: commonReducer,
    adminReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
