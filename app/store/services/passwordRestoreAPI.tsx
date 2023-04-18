import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { api as mainApi } from "./api";
export const api = mainApi.injectEndpoints({
    endpoints: (build) => ({
        registration: build.mutation({
            query: (payload) => ({
                url: "/users/fastRegistration",
                method: "POST",
                body: payload,
            }),
        }),
        registrationCall: build.mutation({
            query: (phone) => ({
                url: "/passwordRestore/registrationCall",
                method: "POST",
                body: {
                    userData: phone,
                },
            }),
        }),
        checkCode: build.mutation({
            query: (payload) => ({
                url: "/passwordRestore/checkCode",
                method: "POST",
                body: payload,
            }),
        }),
        restoreCall: build.mutation({
            query: (phone) => ({
                url: "/passwordRestore/restoreCall",
                method: "POST",
                body: {
                    userData: phone,
                },
            }),
        }),
        resetPassword: build.mutation({
            query: (payload) => ({
                url: "/passwordRestore/restoreAccepted",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});
