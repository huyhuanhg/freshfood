import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FOOD_ACTION } from '../constants';

const initialState = {
  foodList: {
    data: [],
    load: false,
    error: null,
  },
  foodPromotions: {
    data: [],
    load: false,
    error: null,
  },
  foodDetail: {
    data: {},
    load: false,
    error: null,
  },
};

const foodReducer = createReducer(initialState, {
  [FOOD_ACTION.GET_FOOD_DETAIL]: (state, action) => {
    const { id } = action.payload.data;
    const foods = [...state.foodList.data, ...state.foodPromotions.data];
    const foodDetail = foods.find((foodItem) => foodItem.id === id);
    return {
      ...state,
      foodDetail: {
        data: {
          ...foodDetail,
        },
      },
    };
  },
  [REQUEST(FOOD_ACTION.GET_FOOD_LIST)]: (state) => {
    return {
      ...state,
      foodList: {
        ...state.foodList,
        load: true,
      },
    };
  },
  [SUCCESS(FOOD_ACTION.GET_FOOD_LIST)]: (state, action) => {
    const { foods } = action.payload.data;
    return {
      ...state,
      foodList: {
        ...state.foodList,
        data: foods,
        load: false,
        error: null,
      },
    };
  },
  [REQUEST(FOOD_ACTION.GET_FOOD_PROMOTIONS)]: (state) => {
    return {
      ...state,
      foodPromotions: {
        ...state.foodPromotions,
        load: true,
      },
    };
  },
  [SUCCESS(FOOD_ACTION.GET_FOOD_PROMOTIONS)]: (state, action) => {
    const { foodPromotions } = action.payload.data;
    return {
      ...state,
      foodPromotions: {
        ...state.foodPromotions,
        data: foodPromotions,
        load: false,
        error: null,
      },
    };
  },
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
