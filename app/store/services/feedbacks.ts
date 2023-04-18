import { cookie } from 'app/utils/helpers/cookies.helpers';
import { api } from './api';

export const feedbacksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addFeedback: builder.mutation({
            query: (payload) => ({
                url: `/feedbacks/addFeedback`,
                method: 'POST',
                body: payload
            })
        }),
    }),
    overrideExisting: true,
});

