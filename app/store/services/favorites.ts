import { cookie } from "app/utils/helpers/cookies.helpers";
import { api } from "./api";

export const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => ({
        url: `/favorites/getByUser?userId=${cookie.get("t")}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value,
    }),
    changeFavoriteState: builder.mutation({
            query: ({ action, payload }) => ({
                url: `/favorites/${action}`,
                method: "POST",
                body: payload,
            }),
        }),
    addToFavorites: builder.mutation({
      query: (payload) => ({
        url: `/favorites/add`,
        method: "POST",
        body: payload,
      }),
    }),
    deleteFromFavorites: builder.mutation({
      query: (payload) => ({
        url: `/favorites/remove`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: true,
});
