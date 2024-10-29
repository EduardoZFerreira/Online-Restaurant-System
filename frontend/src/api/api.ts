import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMenuItemCategory } from "../Interfaces/IMenuItemCategory";
import { SaveReservationDTO } from "../DTOs/SaveReservationDTO";
import { IReservation } from "../Interfaces/IReservation";
import { IUser } from "../Interfaces/IUser";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8081",
  }),
  tagTypes: ["Reservation"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/user",
    }),
    getMenuItems: builder.query<IMenuItemCategory[], void>({
      query: () => "/menu",
    }),
    addReservation: builder.mutation({
      query: (reservation: SaveReservationDTO) => ({
        url: "/reservation",
        method: "POST",
        body: reservation,
      }),
      invalidatesTags: ["Reservation"],
    }),
    getReservationByUserId: builder.query<IReservation[], string>({
      query: (userId) => `/reservation/user/${userId}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMenuItemsQuery,
  useAddReservationMutation,
  useLazyGetReservationByUserIdQuery,
} = api;
