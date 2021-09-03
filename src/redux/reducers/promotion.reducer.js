import {createReducer} from '@reduxjs/toolkit';
import {REQUEST, SUCCESS, FAILURE, PROMOTION_ACTION} from '../constants';

const initialState = {
    promotionList: {
        data: [],
        load: false,
        error: null,
    },
}

const promotionReducer = createReducer(initialState, {

});

export default promotionReducer;
