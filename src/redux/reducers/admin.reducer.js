import {REQUEST, SUCCESS, FAILURE, ADMIN_ACTION, USER_ACTION} from '../constants';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    userAdminList: [],
    adminInfo: {
        data: {},
        load: true,
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
const adminReducer = createReducer(initialState, {
    [REQUEST(ADMIN_ACTION.ADMIN_LOGIN)]: (state, action) => {
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
    [SUCCESS(ADMIN_ACTION.ADMIN_LOGIN)]: (state, action) => {
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
            adminInfo: {
                ...state.adminInfo,
                data: {
                    ...state.adminInfo.data,
                    data,
                }
            },
        };
    },

    [FAILURE(ADMIN_ACTION.ADMIN_LOGIN)]: (state, action) => {
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

    [REQUEST(ADMIN_ACTION.GET_ADMIN_INFO)]: (state, action) => {
        return {
            ...state,
            adminInfo: {
                ...state.adminInfo,
                error: null,
            },
        };
    },
    [SUCCESS(ADMIN_ACTION.GET_ADMIN_INFO)]: (state, action) => {
        const {data} = action.payload;
        return {
            ...state,
            adminInfo: {
                ...state.adminInfo,
                data,
                load: false,
                error: null,
            },
        };
    },
    [FAILURE(ADMIN_ACTION.GET_ADMIN_INFO)]: (state, action) => {
        const {error} = action.payload;
        return {
            ...state,
            adminInfo: {
                ...state.adminInfo,
                data: {},
                load: false,
                error,
            },
        };
    },

})

export default adminReducer;
