import {REQUEST, SUCCESS, FAILURE, USER_ACTION, PRODUCT_ACTION} from '../constants';
import {createReducer} from '@reduxjs/toolkit';

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
        }
    }
}
const userReducer = createReducer(initialState, {
    [REQUEST(USER_ACTION.LOGIN)]: (state, action) => {
        return {
            ...state,
            responseAction: {
                ...state.responseAction,
                login: {
                    ...state.responseAction.login,
                    load: true,
                    error: null,
                },
            }
        };
    },
    [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
        const {data} = action.payload;
        return {
            ...state,
            responseAction: {
                ...state.responseAction,
                login: {
                    ...state.responseAction.login,
                    load: false,
                    error: null,
                }
            },
            userInfo: {
                ...state.userInfo,
                data: {
                    ...state.userInfo.data,
                    data,
                }
            },
        };
    },
    [FAILURE(USER_ACTION.LOGIN)]: (state, action) => {
        const {error} = action.payload;
        return {
            ...state,
            responseAction: {
                ...state.responseAction,
                login: {
                    ...state.responseAction.login,
                    load: false,
                    error,
                }
            },
        };
    },

    [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
        return {
            ...state,
            userInfo: {},
        };
    },

    [REQUEST(USER_ACTION.REGISTER)]: (state, action) => {
        return {
            ...state,
            responseAction: {
                ...state.responseAction,
                register: {
                    ...state.responseAction.register,
                    load: true,
                    error: null,
                }
            }
        };
    },
    [FAILURE(USER_ACTION.REGISTER)]: (state, action) => {
        const {error} = action.payload;
        return {
            ...state,
            responseAction: {
                ...state.responseAction,
                register: {
                    ...state.responseAction.register,
                    load: false,
                    error,
                }
            }
        };
    },
    [REQUEST(USER_ACTION.GET_USER_INFO)]: (state, action) => {
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
        const {data} = action.payload;
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                data,
                load: false,
                error: null,
            },
        };
    },
    [FAILURE(USER_ACTION.GET_USER_INFO)]: (state, action) => {
        const {error} = action.payload;
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                load: false,
                error,
            },
        };
    },

})

export default userReducer;
