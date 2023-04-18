import { cookie } from "app/utils/helpers/cookies.helpers";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyInfo: builder.query({
      query: () => ({
        url: `/users/myInfo?userId=${cookie.get("t")}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value[0],
    }),
    getUserPoints: builder.query({
      query: (payload) => ({
        url: `/users/userPoints?userId=${cookie.get("t")}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value,
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/users/edit`,
        method: "POST",
        body: payload,
      }),
    }),
    deleteUser: builder.mutation({
      query: (payload) => ({
        url: "/users/selfDelete",
        method: "POST",
        body: payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/users/changePassword",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/users/login",
        method: "POST",
        body: payload,
      }),
    }),
    subscribe: builder.mutation({
      query: (payload) => ({
        url: "/usersSubscriptions/subscribe",
        method: "POST",
        body: payload,
      }),
    }),
    unsubscribe: builder.mutation({
      query: (payload) => ({
        url: "/usersSubscriptions/unsubscribe",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: true,
});
