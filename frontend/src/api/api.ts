import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMenuItemCategory } from "../Interfaces/IMenuItemCategory";
import { SaveReservationDTO } from "../DTOs/SaveReservationDTO";

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
  }),
});

export const { useGetMenuItemsQuery, useAddReservationMutation } = api;
