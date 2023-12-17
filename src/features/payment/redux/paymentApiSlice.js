import { apiSlice } from "../../../app/api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/",
        method: "POST",
        body: paymentData,
      }),
    }),
    getPaymentById: builder.query({
      query: (paymentId) => `/payments/${paymentId}`,
    }),
    getPaymentByApartmentId: builder.query({
      query: (apartmentId) => `/payments/apartment/${apartmentId}`,
    }),
    updatePayment: builder.mutation({
      query: ({ paymentId, paymentData }) => ({
        url: `/payments/${paymentId}`,
        method: "PUT",
        body: paymentData,
      }),
    }),
    deletePayment: builder.mutation({
      query: (paymentId) => ({
        url: `/payments/${paymentId}`,
        method: "DELETE",
      }),
    }),
    getAllPayments: builder.query({
      query: () => "/payments/",
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentByIdQuery,
  useGetPaymentByApartmentIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetAllPaymentsQuery,
} = paymentApiSlice;