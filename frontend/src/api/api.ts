import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
  endpoints: (builder) => ({
    getMenuItems: builder.query<any, void>({
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

export const { useGetMenuItemsQuery, useAddReservationMutation } = api;
