import { createAction } from '@reduxjs/toolkit';
import { REQUEST, FOOD_ACTION } from '../constants';

export const getFoodListAction = createAction(REQUEST(FOOD_ACTION.GET_FOOD_LIST));
export const getFoodDetailAction = createAction(REQUEST(FOOD_ACTION.GET_FOOD_DETAIL));
export const createFoodAction = createAction(REQUEST(FOOD_ACTION.CREATE_FOOD));
export const editFoodAction = createAction(REQUEST(FOOD_ACTION.EDIT_FOOD));
export const deleteFoodAction = createAction(REQUEST(FOOD_ACTION.DELETE_FOOD));
