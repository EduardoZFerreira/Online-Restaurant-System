import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMenuItemCategory } from "../Interfaces/IMenuItemCategory";
import { SaveReservationDTO } from "../DTOs/SaveReservationDTO";
import { IReservation } from "../Interfaces/IReservation";
import { IUser } from "../Interfaces/IUser";

import { setCredentials, logOut } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8081",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth: any };
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/reauthenticate", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryReauth,
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
