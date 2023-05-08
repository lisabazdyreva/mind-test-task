import { useState } from "react";

import { useAddToCartMutation, useGetCartQuery } from "../../services/cart.ts";
import { IProduct } from "../../types/product.ts";

interface IProductProps {
  product: IProduct;
}

const Product = ({ product }: IProductProps) => {
  const userCartId = Number(localStorage.getItem("userCartId"));
  const [cartId, setCartId] = useState(userCartId);

  const [addToCart, { isLoading, isError }] = useAddToCartMutation();
  const { data: cartItems } = useGetCartQuery(cartId);

  const onClickAddToCartButtonHandler = async () => {
    if (cartId === 0) {
      const cartItem = await addToCart({
        productId: product.id,
        quantity: 1,
      });
      const { data }: any = cartItem; //TODO any
      setCartId(data.cartId);
      localStorage.setItem("userCartId", data.cartId);
    } else {
      await addToCart({
        productId: product.id,
        quantity: 1,
        userCartId: cartId,
      });
    }
  };

  const isAlreadyInCart = Boolean(
    cartItems?.filter((cartItem) => cartItem.productId === product.id).length
  );

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>

      <button
        onClick={onClickAddToCartButtonHandler}
        type="button"
        disabled={isAlreadyInCart}
      >
        {isAlreadyInCart ? "Already in" : "Add to"} Cart
      </button>
      {isLoading && "Trying add to cart..."}
      {isError && "Some error occurred. We cannot add this product to cart"}
    </div>
  );
};

export default Product;
