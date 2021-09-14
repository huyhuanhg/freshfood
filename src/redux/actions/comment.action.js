import { createAction } from '@reduxjs/toolkit';
import { REQUEST, COMMENT_ACTION } from '../constants';

export const createCommentAction = createAction(REQUEST(COMMENT_ACTION.CREATE_COMMENT));
export const getCommentsAction = createAction(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST));
