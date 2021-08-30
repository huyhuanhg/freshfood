import {createReducer} from '@reduxjs/toolkit';
import {REQUEST, SUCCESS, FAILURE, STORE_ACTION} from '../constants';
import store1 from "../../assets/images/store1.jpeg";

const initialState = {
    storeList: {
        data: [
            {
                id: 1,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 6,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 5,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 4,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 3,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá, sẽ tiếp tục ủng hộ lần sau! sẽ tiếp tục ủng hộ lần sau!"
                }
            },
            {
                id: 2,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 12,
                avatar: store1,
                store_name: 'Tiệm bánh ngọt, bánh sinh nhật Bảo Trang',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 11,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 10,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
            {
                id: 9,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá Ăn ngon quá"
                }
            },
            {
                id: 8,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://images.foody.vn/usr/g867/8668321/avt/c100x100/0984557415-avatar-914-636495762013014344.jpg',
                    comment: "Ăn ngon quá, sẽ tiếp tục ủng hộ lần sau! sẽ tiếp tục ủng hộ lần sau!"
                }
            },
            {
                id: 7,
                avatar: store1,
                store_name: 'Gà rán Bảo Trung',
                store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
                total_comment: 10,
                total_food: 100,
                rate: 4.5,
                last_comment: {
                    user_name: "Huấn",
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    comment: "Ăn ngon quá"
                }
            },
        ],
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
    //TODO
});

export default storeReducer;
