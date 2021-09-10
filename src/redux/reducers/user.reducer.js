import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from '../constants';

const initialState = {
  userList: [],
  userInfo: {
    data: {},
    load: false,
    error: null,
  },
  responseAction: {
    login: {
      load: false,
      error: null,
    },
    register: {
      load: false,
      error: null,
      email: {
        success: false,
        load: false,
        error: null,
      },
    },
  },
};
const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.LOGIN)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          load: true,
          error: null,
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          load: false,
          error: null,
        },
      },
      userInfo: {
        ...state.userInfo,
        data,
      },
    };
  },
  [FAILURE(USER_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          load: false,
          error,
        },
      },
    };
  },
  [REQUEST(USER_ACTION.CHECK_EMAIL_EXISTS)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          email: {
            load: true,
            success: false,
            error: null,
          },
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.CHECK_EMAIL_EXISTS)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          email: {
            load: false,
            error: null,
            success: true,
          },
        },
      },
    };
  },
  [FAILURE(USER_ACTION.CHECK_EMAIL_EXISTS)]: (state, action) => {
    const { error, status } = action.payload;
    if (status === 403) {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          register: {
            ...state.responseAction.register,
            email: {
              load: false,
              success: false,
              error,
            },
          },
        },
      };
    }
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          email: {
            load: false,
            success: false,
            error: null,
          },
        },
      },
    };
  },

  [REQUEST(USER_ACTION.LOGOUT)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: {},
      },
    };
  },

  [REQUEST(USER_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          load: true,
          error: null,
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          load: false,
        },
      },
    };
  },

  [FAILURE(USER_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          load: false,
        },
      },
    };
  },

  [REQUEST(USER_ACTION.GET_USER_INFO)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: false,
        error,
      },
    };
  },
  [REQUEST(USER_ACTION.REFRESH_TOKEN)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.REFRESH_TOKEN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(USER_ACTION.REFRESH_TOKEN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: false,
        error,
      },
    };
  },
});

export default userReducer;
