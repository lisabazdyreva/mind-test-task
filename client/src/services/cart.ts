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
    removeFromCart: build.mutation<
      ICart,
      { userId: string | null; cartItemId: number }
    >({
      query(body) {
        return {
          url: "/cart-item",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    updateQuantity: build.mutation<
      ICart,
      { cartItemId: number; quantity: number; userId: string | null }
    >({
      query(body) {
        return {
          url: "/cart-item",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getCart: build.query<Cart, string | null>({
      query: (userId) => {
        return { url: "/cart", params: { userId } };
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Cart", id } as const)),
        { type: "Cart" as const, id: "Cart" },
      ],
    }),
    removeCart: build.mutation<CartItems, { userId: string | null }>({
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
  useUpdateQuantityMutation,
  useGetCartQuery,
  useRemoveCartMutation,
  useGetErrorProneQuery,
} = cartApi;
export const {
  endpoints: { addToCart },
} = cartApi;
