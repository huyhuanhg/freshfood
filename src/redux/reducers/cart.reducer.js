import {createReducer} from '@reduxjs/toolkit';
import {REQUEST, SUCCESS, FAILURE, FOOD_ACTION} from '../constants';
import food1 from "../../assets/images/food1.jpg";
import food2 from "../../assets/images/food2.jpg";
import food3 from "../../assets/images/food3.jpg";
import food4 from "../../assets/images/food4.jpg";

const initialState = {
    cartList: {
        data: [
            {
                id: 1,
                name: "bánh mì",
                store: 'Bánh mì Thu Hương',
                avatar: food1,
                quantity: 1,
                price: 20000,
            },
            {
                id: 2,
                name: "bánh mì",
                store: 'Bánh mì Thu Hương',
                avatar: food2,
                quantity: 1,
                price: 20000,
                discount: 22000,
            },
            {
                id: 3,
                name: "bánh mì",
                store: 'Bánh mì Thu Hương',
                avatar: food3,
                quantity: 2,
                price: 20000,
                discount: 22000,
            },
            {
                id: 7,
                name: "bánh mì",
                store: 'Bánh mì Thu Hương',
                avatar: food3,
                quantity: 2,
                price: 20000,
                discount: 22000,
            },
            {
                id: 6,
                name: "bánh mì",
                store: 'Bánh mì Thu Hương',
                avatar: food3,
                quantity: 2,
                price: 20000,
                discount: 22000,
            },
            {
                id: 5,
                name: "bánh mì",
                store: 'Bánh mì Thu Hương',
                avatar: food3,
                quantity: 2,
                price: 20000,
                discount: 22000,
            },
            {
                id: 4,
                name: "bánh mì",
                store: 'Bánh mì Thu Hương',
                avatar: food3,
                quantity: 2,
                price: 20000,
                discount: 22000,
            },
        ],
        load: false,
        error: null,
    },
    totalPrice: 240000,
    total: 12,
}

const cartReducer = createReducer(initialState, {
    //TODO
});

export default cartReducer;
