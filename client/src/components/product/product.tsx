import { useState } from "react";

import { useAddToCartMutation, useGetCartQuery } from "../../services/cart.ts";
import { IProduct } from "../../types/product.ts";

interface IProductProps {
  product: IProduct;
}

const Product = ({ product }: IProductProps) => {
  const [cartId, setCartId] = useState(localStorage.getItem("userCartId"));
  const [addToCart] = useAddToCartMutation();
  const { data: cartItems } = useGetCartQuery(Number(cartId));

  const onClickAddToCartButtonHandler = async () => {
    if (!cartId) {
      const cartItem = await addToCart({ productId: product.id, quantity: 1 });
      const { data }: any = cartItem; //TODO any

      setCartId(data.cartId);
      await localStorage.setItem("userCartId", data.cartId);
    } else {
      await addToCart({
        productId: product.id,
        quantity: 1,
        userCartId: Number(cartId),
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
    </div>
  );
};

export default Product;
