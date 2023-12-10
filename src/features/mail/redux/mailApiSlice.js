import { apiSlice } from "../../../app/api/apiSlice";

export const mailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/verify-email?token=${data.token}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useVerifyEmailMutation } = mailApiSlice;
