import {createAction} from '@reduxjs/toolkit';
import {REQUEST, STORE_ACTION} from '../constants';

export const getStoresAction = createAction(REQUEST(STORE_ACTION.GET_STORE_LIST));