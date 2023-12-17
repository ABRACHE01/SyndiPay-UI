import { apiSlice } from "../../../app/api/apiSlice";

export const apartmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createApartment: builder.mutation({
      query: (apartmentData) => ({
        url: "/apartments/",
        method: "POST",
        body: apartmentData,
      }),
    }),
    getApartmentById: builder.query({
      query: (apartmentId) => `/apartments/${apartmentId}`,
    }),
    updateApartment: builder.mutation({
      query: ({ apartmentId, apartmentData }) => ({
        url: `/apartments/${apartmentId}`,
        method: "PUT",
        body: apartmentData,
      }),
    }),
    deleteApartment: builder.mutation({
      query: (apartmentId) => ({
        url: `/apartments/${apartmentId}`,
        method: "DELETE",
      }),
    }),
    getAllApartments: builder.query({
      query: () => "/apartments/",
    }),
  }),
});

export const {
  useCreateApartmentMutation,
  useGetApartmentByIdQuery,
  useUpdateApartmentMutation,
  useDeleteApartmentMutation,
  useGetAllApartmentsQuery,
  useUploadPhotoMutation,
} = apartmentApiSlice;