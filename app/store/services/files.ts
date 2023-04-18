import { cookie } from 'app/utils/helpers/cookies.helpers';
import { api } from './api';

export const filesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadPhoto: builder.mutation({
            query: (payload) => ({
                url: `/files/uploadPhoto`,
                method: 'POST',
                body: payload
            }),
            transformResponse: (response: any) => ({ state: response.state, ...response.value })
        }),
        uploadVideo: builder.mutation({
            query: (payload) => ({
                url: `/files/uploadVideo`,
                method: 'POST',
                body: payload
            }),
            transformResponse: (response: any) => ({ state: response.state, ...response.value })
        }),
    }),
    overrideExisting: true,
});

