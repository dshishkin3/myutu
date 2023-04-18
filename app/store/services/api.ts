import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { cookie } from "app/utils/helpers/cookies.helpers";


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.api_root_v1,
    prepareHeaders: async (headers, {getState}) => {
        // const token = cookie.get("token");
        // headers.set("Authorization", token || "");
        return headers;
    },
}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({ })
});