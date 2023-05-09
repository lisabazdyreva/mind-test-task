import { api } from "./api";

import { IProduct, Products } from "../types/product.ts";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Products, void>({
      query: () => ({ url: "/products" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Products", id } as const)),
        { type: "Products" as const, id: "PRODUCTS" },
      ],
    }),
    createProduct: build.mutation<IProduct, FormData>({
      query(body) {
        return {
          url: "/products/create",
          method: "POST",
          body,
          formData: true,
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
  useGetProductsQuery,
  useCreateProductMutation,
  useGetErrorProneQuery,
} = productsApi;
export const {
  endpoints: { getProducts },
} = productsApi;
