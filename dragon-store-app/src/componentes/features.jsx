import { createSlice } from "@reduxjs/toolkit";
import categories from './categories.json';
import products from './productos.json';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            categories: categories,
            products: products,
            categorySelected: "",
            productsFilteredByCategory: [],
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.productsFilteredByCategory = products.filter(product => 
                product.category && product.category.toLowerCase() === action.payload.toLowerCase()
            );
            state.value.categorySelected = action.payload;
        }
    }
});

export const { setCategory } = shopSlice.actions;

export default shopSlice.reducer;
