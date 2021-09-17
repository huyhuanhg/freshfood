import { createAction } from '@reduxjs/toolkit';
import { REQUEST, RATE_ACTION } from '../constants';

export const createRateAction = createAction(REQUEST(RATE_ACTION.CREATE_RATE));
