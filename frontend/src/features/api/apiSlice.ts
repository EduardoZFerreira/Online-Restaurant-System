import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => "/menuItem",
    }),
    addReservation: builder.mutation({
      query: (reservation: any) => ({
        url: "/reservation",
        method: "POST",
        body: reservation,
      }),
    }),
  }),
});

export const { useGetMenuItemsQuery, useAddReservationMutation } = apiSlice;
