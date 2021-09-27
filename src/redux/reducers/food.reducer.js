import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FOOD_ACTION, LIKE_ACTION } from '../constants';

const initialState = {
  foodList: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
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
    const { currentPage, lastPage, total, data } = action.payload.data;
    let newFoods = [...data];
    if (currentPage > state.foodList.currentPage) {
      newFoods = [...state.foodList.data, ...newFoods];
    }
    return {
      ...state,
      foodList: {
        ...state.foodList,
        data: newFoods,
        load: false,
        error: null,
        currentPage,
        lastPage,
        total,
        likeLoaded: false,
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
  [SUCCESS(FOOD_ACTION.GET_FOOD_PROMOTIONS)]: (state, { payload: { data: { data } } }) => {
    return {
      ...state,
      foodPromotions: {
        ...state.foodPromotions,
        data,
        load: false,
        error: null,
        likeLoaded: false,
      },
    };
  },
  [SUCCESS(LIKE_ACTION.GET_LIKE_LIST)]: (state, action) => {
    const { data, type } = action.payload;
    let foodList = [];
    if (type === 'promotion') {
      foodList = [...state.foodPromotions.data];
    } else {
      foodList = [...state.foodList.data];
    }

    foodList = foodList.map((foodItem) => {
      const like = data.includes(foodItem.id);
      return {
        ...foodItem,
        like,
      };
    });
    let newList = {
      likeLoaded: true,
    };

    if (type === 'promotion') {
      newList = {
        ...state,
        foodPromotions: {
          ...state.foodPromotions,
          ...newList,
          data: foodList,
        },
      };
    } else {
      newList = {
        ...state,
        foodList: {
          ...state.foodList,
          ...newList,
          data: foodList,
        },
      };
    }

    return newList;
  },
  [SUCCESS(LIKE_ACTION.TOGGLE_LIKE)]: (state, action) => {
    const { foodId } = action.payload.data;
    const foodList = [...state.foodList.data];
    const foodPromotions = [...state.foodPromotions.data];
    const foodIndex = foodList.findIndex((foodItem) => foodItem.id === foodId);
    const promotionIndex = foodPromotions.findIndex((foodItem) => foodItem.id === foodId);
    if (foodIndex !== -1) {
      const newFood = {
        ...foodList[foodIndex],
        like: !foodList[foodIndex].like,
      };
      foodList.splice(foodIndex, 1, newFood);
    }
    if (promotionIndex !== -1) {
      const newPromotion = {
        ...foodPromotions[promotionIndex],
        like: !foodPromotions[promotionIndex].like,
      };
      foodPromotions.splice(promotionIndex, 1, newPromotion);
    }
    return {
      ...state,
      foodList: {
        ...state.foodList,
        data: foodList,
      },
      foodPromotions: {
        ...state.foodPromotions,
        data: foodPromotions,
      },
    };
  },
});

export default foodReducer;
