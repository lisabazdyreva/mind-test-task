import { api } from "./api.ts";
import { Cart, CartItems, ICart, ICartItem } from "../types/cart-item.ts";

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation<ICartItem, Partial<ICartItem>>({
      query(body) {
        return {
          url: "/cart-item",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: build.mutation<ICart, { cartItemId: number }>({
      query(body) {
        return {
          url: "/cart-item",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getCart: build.query<Cart, number>({
      query: (id) => ({ url: "/cart", params: { userId: id } }),

      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Cart", id } as const)),
        { type: "Cart" as const, id: "CART" },
      ],
    }),
    removeCart: build.mutation<CartItems, { cartId: number }>({
      query(body) {
        return {
          url: "/cart",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => "error-prone",
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
  useRemoveCartMutation,
  useGetErrorProneQuery,
} = cartApi;
export const {
  endpoints: { addToCart },
} = cartApi;
