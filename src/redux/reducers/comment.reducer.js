import { createReducer } from '@reduxjs/toolkit';
import { COMMENT_ACTION, FAILURE, REQUEST, SUCCESS } from '../constants';

const initialState = {
  commentList: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
  },
};

const commentReducer = createReducer(initialState, {
  [REQUEST(COMMENT_ACTION.CREATE_COMMENT)]: (state) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.CREATE_COMMENT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      commentList: {
        data: [
          {
            ...data,
          },
          ...state.commentList.data,
        ],
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(COMMENT_ACTION.CREATE_COMMENT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error,
      },
    };
  },
  [REQUEST(COMMENT_ACTION.GET_COMMENT_LIST)]: (state) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { data, currentPage, total, lastPage } = action.payload.data;
    return {
      ...state,
      commentList: {
        data,
        currentPage,
        total,
        lastPage,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error,
      },
    };
  },
});

export default commentReducer;
