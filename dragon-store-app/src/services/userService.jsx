import { createApi } from "@reduxjs/toolkit/query/react";
import { authenticatedBaseQuery } from "./authenticatedBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authenticatedBaseQuery,
  endpoints: (builder) => ({
    putProfilePicture: builder.mutation({
      query: ({ image,localId }) => ({
        url: `profilePictures/${localId}.json`,
        method: "PUT",
        body: {
            image:image
        }
      }),
    }),
    getProfilePicture: builder.query({
        query: (localId) => `profilePictures/${localId}.json`
    })
  }),
});

export const { usePutProfilePictureMutation, useGetProfilePictureQuery } = userApi;