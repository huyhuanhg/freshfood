import {createReducer} from '@reduxjs/toolkit';
import {REQUEST, SUCCESS, FAILURE, STORE_ACTION} from '../constants';
import store1 from "../../assets/images/store1.jpeg";

const initialState = {
    storeList: {
        data: [],
        load: false,
        error: null,
    },
    storeDetail: {
        data:
            {
                id: 9,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_category: 'Ăn vặt - Vỉa hè',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                store_description: 'Chúng tôi sẽ cố gắng để phục vụ quý khách chu đáo nhất',
                open_time: '16:00',
                close_time: '21:00',
                total_comment: 10,
                total_food: 100,
                rate_count: 99,
                your_rate: 4,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá Ăn ngon quá"
                }
            },
        load: false,
        error: null,
    },
}

const storeReducer = createReducer(initialState, {

    [REQUEST(STORE_ACTION.GET_STORE_LIST)]: (state) => {
        return {
            ...state,
            storeList: {
                ...state.storeList,
                load: true,
            },
        };
    },
    [SUCCESS(STORE_ACTION.GET_STORE_LIST)]: (state, action) => {
        const {stores} = action.payload.data;
        return {
            ...state,
            storeList: {
                ...state.storeList,
                data: stores,
                load: false,
                error: null,
            },
        }
    },
});

export default storeReducer;
