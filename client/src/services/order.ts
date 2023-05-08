import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    postOrder: build.mutation<
      { userId: string; customer_phone: string; id: number },
      { userId: string; customer_phone: string; sum: number }
    >({
      query(body) {
        return {
          url: "/order",
          method: "POST",
          body,
        };
      },
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => "error-prone",
    }),
  }),
});

export const { usePostOrderMutation, useGetErrorProneQuery } = productsApi;
