import { cookie } from "app/utils/helpers/cookies.helpers";
import { api } from "./api";

export const transfersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyAds: builder.query({
      query: ({ type, typeAds }) => ({
        url: `/transfer/getMyAds?userId=${cookie.get("t")}`,
        method: "GET",
        params: {
          type,
          typeAds,
        },
      }),
      transformResponse: (response: any) => response.value,
    }),

    getAd: builder.query({
      query: ({ id, userId }) => ({
        url: `/transfer/getAd`,
        method: "GET",
        params: {
          adId: id,
          userId: userId,
        },
      }),
      transformResponse: (response: any) => response.value,
    }),
    addAd: builder.mutation({
      query: (payload) => ({
        url: `/transfer/add`,
        method: "POST",
        body: payload
      }),
      transformResponse: (response: any) => response,
    }),
    updateAd: builder.mutation({
      query: (payload) => ({
        url: `/transfer/edit`,
        method: "POST",
        body: payload
      }),
      transformResponse: (response: any) => response,
    }),
    setAdActive: builder.mutation({
      query: (payload) => ({
        url: `/transfer/setAdActive`,
        method: "POST",
        body: payload
      })
    })
  }),
  overrideExisting: true,
});
