import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    postOrder: build.mutation<
      { cartId: number; customer_phone: string; id: number },
      { cartId: number; customer_phone: string; sum: number }
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
