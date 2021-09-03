import {createReducer} from '@reduxjs/toolkit';
import {REQUEST, SUCCESS, FAILURE, TAG_ACTION, FOOD_ACTION} from '../constants';

const initialState = {
    tagList: {
        data: [
        ],
        load: false,
        error: null,
    },
}

const tagReducer = createReducer(initialState, {
    [SUCCESS(FOOD_ACTION.GET_FOOD_LIST)]: (state, action) => {
        const {tags} = action.payload.data;
        return {
            ...state,
            tagList: {
                ...state.tagList,
                data: tags,
                load: false,
                error: null,
            },
        }
    }
});

export default tagReducer;
