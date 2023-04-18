import { cookie } from 'app/utils/helpers/cookies.helpers';
import { api } from './api';

export const infoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => `/info/getAllCategories`,
            transformResponse: (response: any) => response.value
        }),
        getAllSubCategories: builder.query({
            query: () => `/info/getAllSubCategories`,
            transformResponse: (response: any) => response.value
        }),
        subcategoriesByCategory: builder.query({
            query: (categoryId) => ({
                url: `/info/subcategoriesByCategory`,
                params: { categoryId }
            }),
            transformResponse: (response: any) => response.value
        }),
        getCitiesByName: builder.query({
            query: (name) => `/info/getCitiesByName?name=${name}`,
            transformResponse: (response: any) => response.value 
        }),
        getTagsByName: builder.query({
            query: (name) => `/info/getTagsByName?name=${name}`,
            transformResponse: (response: any) => response.value 
        }),
    }),
    overrideExisting: true,
});

