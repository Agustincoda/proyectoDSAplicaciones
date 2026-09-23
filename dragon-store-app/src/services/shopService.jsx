import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories.json',
            // Firebase RTDB devuelve un array con huecos en null cuando las
            // claves son numéricas pero no arrancan en 0 (acá arrancan en 1)
            // hay que filtrarlos o revienta el keyExtractor/renderItem.
            transformResponse: (response) => response ? Object.values(response).filter(Boolean) : []
        }),
        getProducts: builder.query({
            query: () => 'products.json',
            transformResponse: (response) => response ? Object.values(response).filter(Boolean) : []
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
                const products = response ? Object.values(response).filter(Boolean) : [];
                return products.filter(product => product.Categoria?.toLowerCase() === category?.toLowerCase());
            }
        }),
        getProduct: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => response ? Object.values(response).filter(Boolean)[0] : null
        })
    })
});

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductQuery } = shopApi;
