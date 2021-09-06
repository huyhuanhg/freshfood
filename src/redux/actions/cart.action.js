import { createAction } from '@reduxjs/toolkit';
import { REQUEST, CART_ACTION } from '../constants';

export const getCartsAction = createAction(REQUEST(CART_ACTION.GET_CART_LIST));
