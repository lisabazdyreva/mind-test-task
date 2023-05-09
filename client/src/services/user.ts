import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<void, { userId: string }>({
      query(body) {
        return {
          url: "/user/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    removeUser: build.mutation<void, { userId: string | null }>({
      query(body) {
        return {
          url: "/user/",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => "error-prone",
    }),
  }),
});

export const {
  useCreateUserMutation,
  useRemoveUserMutation,
  useGetErrorProneQuery,
} = userApi;
