import {createReducer} from '@reduxjs/toolkit';
import {REQUEST, SUCCESS, FAILURE, FOOD_ACTION} from '../constants';
import food1 from "../../assets/images/food1.jpg";
import food2 from "../../assets/images/food2.jpg";
import food3 from "../../assets/images/food3.jpg";
import food4 from "../../assets/images/food4.jpg";

const initialState = {
    foodList: {
        data: [
            {
                id: 1,
                avatar: food1,
                name: "Phở",
                store: "Quán gà rán",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                rate: 4.5,
                total_order: 101,
            },
            {
                id: 2,
                avatar: food2,
                store: "Quán gà rán",
                name: "Đùi gà rán",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                total_order: 101,
                rate: 4.5,
            },
            {
                id: 3,
                avatar: food3,
                store: "Quán gà rán",
                name: "Bánh mì thịt",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                price: 30000,
                priceAfter: 28000,
                total_order: 101,
                rate: 4.5,
            },
            {
                id: 4,
                avatar: food4,
                name: "Cua biển",
                store: "Quán gà rán",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                total_order: 101,
                rate: 4.5,
            },
            {
                id: 5,
                avatar: food4,
                store: "Quán gà rán",
                name: "Cua biển",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                total_order: 101,
                rate: 4.5,
            },
            {
                id: 6,
                avatar: food4,
                store: "Quán gà rán",
                name: "Cua biển",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                rate: 4.5,
                total_order: 101,
            },
            {
                id: 7,
                avatar: food1,
                store: "Quán gà rán",
                name: "Phở",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                rate: 4.5,
                total_order: 101,
            },
            {
                id: 8,
                avatar: food2,
                store: "Quán gà rán",
                name: "Đùi gà rán",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                rate: 4.5,
                total_order: 101,
            },
            {
                id: 9,
                avatar: food3,
                store: "Quán gà rán",
                name: "Bánh mì thịt",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                total_order: 101,
                rate: 4.5,
            },
            {
                id: 10,
                avatar: food4,
                store: "Quán gà rán",
                name: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 70000,
                priceAfter: 50000,
                total_order: 101,
                rate: 4.5,
            },
            {
                id: 11,
                avatar: food4,
                name: "Cua biển",
                store: "Quán gà rán",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                priceAfter: 28000,
                rate: 4.5,
                total_order: 101,
            },
            {
                id: 12,
                avatar: food4,
                name: "Cua biển",
                store: "Quán gà rán",
                description: "Lõi nạc vai bò Mỹ loại choice 1kg tặng kèm hương thảo tây",
                image: [
                    food1,
                    food2,
                    food3,
                    food4,
                ],
                price: 30000,
                priceAfter: 28000,
                rate: 4.5,
                total_order: 101,
            },
        ],
        load: false,
        error: null,
    },
    foodDetail: {
        data: {},
        load: false,
        error: null,
    },
}

const foodReducer = createReducer(initialState, {
    // [REQUEST(food_ACTION.GET_food_LIST)]: (state, action) => {
    //   return {
    //     ...state,
    //     foodList: {
    //       ...state.foodList,
    //       load: true,
    //     },
    //   };
    // },
    // [SUCCESS(food_ACTION.GET_food_LIST)]: (state, action) => {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     foodList: {
    //       ...state.foodList,
    //       data,
    //       load: false,
    //       error: null,
    //     },
    //   }
    // },
    // [FAILURE(food_ACTION.GET_food_LIST)]: (state, action) => {
    //   const { error } = action.payload;
    //   return {
    //     ...state,
    //     foodList: {
    //       ...state.foodList,
    //       load: false,
    //       error,
    //     },
    //   }
    // },
    //
    // [REQUEST(food_ACTION.GET_food_DETAIL)]: (state, action) => {
    //   return {
    //     ...state,
    //     foodDetail: {
    //       ...state.foodDetail,
    //       load: true,
    //     },
    //   };
    // },
    // [SUCCESS(food_ACTION.GET_food_DETAIL)]: (state, action) => {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     foodDetail: {
    //       ...state.foodDetail,
    //       data,
    //       load: false,
    //       error: null,
    //     },
    //   }
    // },
    // [FAILURE(food_ACTION.GET_food_DETAIL)]: (state, action) => {
    //   const { error } = action.payload;
    //   return {
    //     ...state,
    //     foodDetail: {
    //       ...state.foodDetail,
    //       load: false,
    //       error,
    //     },
    //   }
    // },
    //
    // [SUCCESS(food_ACTION.CREATE_food)]: (state, action) => {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     foodList: {
    //       ...state.foodList,
    //       data: [
    //         data,
    //         ...state.foodList.data,
    //       ],
    //     },
    //   }
    // },
    //
    // [SUCCESS(food_ACTION.EDIT_food)]: (state, action) => {
    //   const { data } = action.payload;
    //   const newfoodList = [...state.foodList.data];
    //   const foodIndex = newfoodList.findIndex((food) => food.id === data.id);
    //   newfoodList.splice(foodIndex, 1, data);
    //   return {
    //     ...state,
    //     foodList: {
    //       ...state.foodList,
    //       data: newfoodList,
    //     },
    //   };
    // },
    //
    // [SUCCESS(food_ACTION.DELETE_food)]: (state, action) => {
    //   const { id } = action.payload;
    //   const newfoodList = [...state.foodList.data];
    //   const foodIndex = newfoodList.findIndex((food) => food.id === id);
    //   newfoodList.splice(foodIndex, 1);
    //   return {
    //     ...state,
    //     foodList: {
    //       ...state.foodList,
    //       data: newfoodList,
    //     },
    //   };
    // },
});

export default foodReducer;
