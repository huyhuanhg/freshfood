import { createReducer } from '@reduxjs/toolkit';
import { CART_ACTION, REQUEST, SUCCESS, USER_ACTION } from '../constants';

const initialState = {
  cartList: {
    data: [],
    load: false,
    error: null,
  },
  totalMoney: 0,
  total: 0,
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.GET_CART_LIST)]: (state) => {
    return {
      ...state,
      cartList: {
        ...state.cartList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    const { cartList, total, totalMoney } = action.payload.data;
    return {
      ...state,
      cartList: {
        data: cartList,
        load: false,
        error: null,
      },
      total,
      totalMoney,
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { carts } = action.payload.data;
    return {
      ...state,
      total: carts.count,
    };
  },
});

export default cartReducer;
