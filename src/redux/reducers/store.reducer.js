import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, STORE_ACTION } from '../constants';

const initialState = {
  storeList: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
  },
  storeDetail: {
    data: {},
    load: false,
    error: null,
  },
};

const storeReducer = createReducer(initialState, {
  [REQUEST(STORE_ACTION.GET_STORE_LIST)]: (state) => {
    return {
      ...state,
      storeList: {
        ...state.storeList,
        load: true,
      },
    };
  },
  [SUCCESS(STORE_ACTION.GET_STORE_LIST)]: (state, action) => {
    const { stores } = action.payload.data;
    let newStores = [...stores.data];
    if (stores.currentPage > state.storeList.currentPage) {
      newStores = [...state.storeList.data, ...newStores];
    }
    return {
      ...state,
      storeList: {
        ...state.storeList,
        data: newStores,
        currentPage: stores.currentPage,
        lastPage: stores.lastPage,
        total: stores.total,
        load: false,
        error: null,
      },
    };
  },
  [REQUEST(STORE_ACTION.GET_STORE_DETAIL)]: (state) => {
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        load: true,
      },
    };
  },
  [SUCCESS(STORE_ACTION.GET_STORE_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(STORE_ACTION.GET_STORE_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        load: false,
        error,
      },
    };
  },
});

export default storeReducer;
