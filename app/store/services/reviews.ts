import { cookie } from "app/utils/helpers/cookies.helpers";
import { api } from "./api";

export const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserReviews: builder.query({
      query: () => ({
        url: `/reviews/userReviews?userId=${cookie.get("t")}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value[0],
    }),
    getSellerGrade: builder.query({
      query: (payload) => ({
        url: `/reviews/getSellerGrade?userId=${cookie.get("t")}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value,
    }),
    getAdSellerGrade: builder.query({
      query: (payload) => ({
        url: `/reviews/getSellerGrade?userId=${payload.id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value,
    }),
    getAboutUserReviews: builder.query({
      query: () => ({
        url: `/reviews/aboutUserReviews?userId=${cookie.get("t")}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value,
    }),
    getAdAboutUserReviews: builder.query({
      query: (payload) => ({
        url: `/reviews/aboutUserReviews?userId=${payload.id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.value,
    }),
  }),
  overrideExisting: true,
});
