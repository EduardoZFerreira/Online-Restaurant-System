import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMenuItemCategory } from "../Interfaces/IMenuItemCategory";
import { SaveReservationDTO } from "../DTOs/SaveReservationDTO";
import { IReservation } from "../Interfaces/IReservation";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8081",
  }),
  endpoints: (builder) => ({
    getMenuItems: builder.query<IMenuItemCategory[], void>({
      query: () => "/menu",
    }),
    addReservation: builder.mutation({
      query: (reservation: SaveReservationDTO) => ({
        url: "/reservation",
        method: "POST",
        body: reservation,
      }),
    }),
    getReservationByUserId: builder.query<IReservation[], string>({
      query: (userId) => `/reservation/user/${userId}`,
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useAddReservationMutation,
  useGetReservationByUserIdQuery,
} = api;
