import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories.json',
            transformResponse: (response) => response ? Object.values(response) : [] 
        }),
        getProducts: builder.query({
            query: () => 'products.json',
            transformResponse: (response) => response ? Object.values(response) : []
        }),
        getProductsByCategory: builder.query({
            query: () => 'products.json',  // Cargar todos los productos sin filtro
            transformResponse: (response) => {
                console.log("Respuesta de Firebase (todos los productos):", response);
                return response ? Object.values(response) : [];
            }
        }),
        getProduct: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => response ? Object.values(response)[0] : null
        })
    })
});

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductQuery } = shopApi;
