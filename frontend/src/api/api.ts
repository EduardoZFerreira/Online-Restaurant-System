import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMenuItemCategory } from "../Interfaces/IMenuItemCategory";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
  endpoints: (builder) => ({
    getMenuItems: builder.query<IMenuItemCategory[], void>({
      query: () => "/menu",
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
