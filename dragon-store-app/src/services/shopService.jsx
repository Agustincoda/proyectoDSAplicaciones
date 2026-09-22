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
            // Trae todos los productos y filtra del lado del cliente
            // (RTDB no permite filtrar por igualdad de texto ignorando
            // mayúsculas). "category" NO se puede leer por closure desde
            // "query" de arriba — son dos funciones separadas del mismo
            // objeto — por eso transformResponse lo recibe como su
            // tercer parámetro ("arg" en la documentación de RTK Query).
            query: (category) => 'products.json',
            transformResponse: (response, meta, category) => {
                const products = response ? Object.values(response) : [];
                return products.filter(product => product.Categoria?.toLowerCase() === category?.toLowerCase());
            }
        }),
        getProduct: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => response ? Object.values(response)[0] : null
        })
    })
});

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductQuery } = shopApi;
