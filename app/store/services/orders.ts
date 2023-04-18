import { cookie } from 'app/utils/helpers/cookies.helpers';
import { api } from './api';

export const ordersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (type = "bookedByUserOrdersList") => ({
                url: `/orders/${type}?userId=${cookie.get("t")}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => response.value
        }),
    }),
    overrideExisting: true,
});

