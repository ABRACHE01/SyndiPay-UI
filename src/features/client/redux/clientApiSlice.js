import { apiSlice } from "../../../app/api/apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (clientData) => ({
        url: "/clients/",
        method: "POST",
        body: clientData,
      }),
    }),
    getClientById: builder.query({
      query: (clientId) => `/clients/${clientId}`,
    }),
    updateClient: builder.mutation({
      query: ({ clientId, clientData }) => ({
        url: `/clients/${clientId}`,
        method: "PUT",
        body: clientData,
      }),
    }),
    deleteClient: builder.mutation({
      query: (clientId) => ({
        url: `/clients/${clientId}`,
        method: "DELETE",
      }),
    }),
    getAllClients: builder.query({
      query: () => "/clients/",
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetAllClientsQuery,
} = clientApiSlice;