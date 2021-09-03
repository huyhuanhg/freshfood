import {createReducer} from '@reduxjs/toolkit';
import {REQUEST, SUCCESS, FAILURE, STORE_ACTION} from '../constants';

const initialState = {
    categories: {
        data: [],
        load: false,
        error: null,
    },
}

const categoryReducer = createReducer(initialState, {
    [SUCCESS(STORE_ACTION.GET_STORE_LIST)]: (state, action) => {
        const {categories} =  action.payload.data;
        return {
            ...state,
            categories: {
                ...state.categories,
                data: categories,
                load: false,
                error: null,
            },
        }
    }
});

export default categoryReducer;
