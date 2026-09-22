import { createApi } from '@reduxjs/toolkit/query/react'
import { authenticatedBaseQuery } from './authenticatedBaseQuery'

export const receiptApi = createApi({
    reducerPath: "receiptsApi",
    baseQuery: authenticatedBaseQuery,
    tagTypes: ['Receipts'],
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: ({...receipt})=>({
                url: 'receipts.json',
                method: 'POST',
                body:receipt
            }),
            invalidatesTags: ['Receipts']
        }),
        getReceipts: builder.query({
            query: () => 'receipts.json',
            transformResponse: (response) => response
                ? Object.entries(response)
                    .map(([id, receipt]) => ({ id, ...receipt }))
                    .sort((a, b) => b.createdAt - a.createdAt)
                : [],
            providesTags: ['Receipts']
        })
    })

})

export const {usePostReceiptMutation, useGetReceiptsQuery} = receiptApi