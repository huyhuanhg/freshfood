import { createReducer } from '@reduxjs/toolkit';
import { SUCCESS, BOOKMARK_ACTION, REQUEST, FAILURE } from '../constants';

const initialState = {
  bookmarks: {
    data: [],
    load: false,
    error: null,
  },
  bookmarkDetail: {
    data: {},
    load: false,
    error: null,
  },
};

const bookmarkReducer = createReducer(initialState, {
  [REQUEST(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL)]: (state) => {
    return {
      ...state,
      bookmarkDetail: {
        data: {},
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      bookmarkDetail: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookmarkDetail: {
        data: {},
        load: false,
        error,
      },
    };
  },
  [REQUEST(BOOKMARK_ACTION.CREATE_BOOKMARK)]: (state) => {
    return {
      ...state,
      bookmarkDetail: {
        ...state.bookmarkDetail,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(BOOKMARK_ACTION.CREATE_BOOKMARK)]: (state) => {
    return {
      ...state,
      bookmarkDetail: {
        ...state.bookmarkDetail,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(BOOKMARK_ACTION.CREATE_BOOKMARK)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookmarkDetail: {
        ...state.bookmarkDetail,
        load: false,
        error,
      },
    };
  },
  [REQUEST(BOOKMARK_ACTION.UPDATE_BOOKMARK)]: (state) => {
    return {
      ...state,
      bookmarkDetail: {
        ...state.bookmarkDetail,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(BOOKMARK_ACTION.UPDATE_BOOKMARK)]: (state, action) => {
    const { storeId, description } = action.payload.data;
    const data = [...state.bookmarks.data];
    const bookmarkIndex = data.findIndex((bookmarkItem) => bookmarkItem.storeId === storeId);
    if (bookmarkIndex !== -1) {
      const bookmark = {
        ...data[bookmarkIndex],
        description,
      };
      data.splice(bookmarkIndex, 1, bookmark);
    }
    return {
      ...state,
      bookmarks: {
        ...state.bookmarks,
        data,
      },
      bookmarkDetail: {
        data: {},
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(BOOKMARK_ACTION.UPDATE_BOOKMARK)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookmarkDetail: {
        ...state.bookmarkDetail,
        load: false,
        error,
      },
    };
  },
});

export default bookmarkReducer;
