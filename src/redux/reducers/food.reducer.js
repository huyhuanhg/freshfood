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
    const { foods } = action.payload.data;

    let newFoods = [...foods.data];
    if (foods.currentPage > state.foodList.currentPage) {
      newFoods = [...state.foodList.data, ...newFoods];
    }
    return {
      ...state,
      foodList: {
        ...state.foodList,
        data: newFoods,
        load: false,
        error: null,
        currentPage: foods.currentPage,
        lastPage: foods.lastPage,
        total: foods.total,
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
  [SUCCESS(FOOD_ACTION.GET_FOOD_PROMOTIONS)]: (state, action) => {
    const { foods } = action.payload.data;
    return {
      ...state,
      foodPromotions: {
        ...state.foodPromotions,
        data: foods.data,
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
    if (foodIndex !== -1){
      const newFood = {
        ...foodList[foodIndex],
        like: !foodList[foodIndex].like,
      };
      foodList.splice(foodIndex, 1, newFood);
    }
    if (promotionIndex !== -1){
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
