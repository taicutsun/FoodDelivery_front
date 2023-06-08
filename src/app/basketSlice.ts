import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { delProduct, sendProduct } from "../api/posts"

//interface and state
export interface ProductType {
    name: string,
    price: number
}

const initialState: Array<ProductType> = [];
//interface and state

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addNewItem: (state, action: PayloadAction<ProductType>) => {
            state.push(action.payload);
            sendProduct(action.payload);
        },
        removeItem: (state, action: PayloadAction<ProductType>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === action.payload.name) {
                    delProduct(state[i]);
                    state.splice(i, 1);
                }
            }
        },

    }
})

export const { addNewItem, removeItem } = basketSlice.actions;

export const selectBasket = (state: RootState) => state.basket;//getting basket

export default basketSlice.reducer;