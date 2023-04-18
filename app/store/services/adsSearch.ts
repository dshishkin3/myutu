import { cookie } from 'app/utils/helpers/cookies.helpers';
import { api } from './api';

export const adsSearchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNewAds: builder.query({
            query: ({ userId, city }) => ({
                url: `/adsSearch/newAds`,
                method: 'GET',
                params: {
                    userId: cookie.get("t") || 0,
                    city
                }
            }),
            transformResponse: (response: any) => response.value
        }),
        getAdsSearch: builder.query({
            query: (payload) => ({
                url: `/adsSearch`,
                params: {
                    ...payload
                }
            }),
            transformResponse: (response: any) => response.value
        })
    }),
    overrideExisting: true,
});
