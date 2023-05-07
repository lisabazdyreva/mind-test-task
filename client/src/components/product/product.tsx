import { useAddToCartMutation } from "../../services/cart.ts";
import { useState } from "react";
import { IProduct } from "../../types/product.ts";

interface IProductProps {
  product: IProduct;
}

const Product = ({ product }: IProductProps) => {
  const [cartId, setCartId] = useState(localStorage.getItem("userCartId"));
  const [addToCart, { isLoading }] = useAddToCartMutation();
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

  return (
    <div>
      {isLoading ? "Loading" : "added to cart"}
      <h2>{product.name}</h2>
      <p>{product.price}</p>

      <button onClick={onClickAddToCartButtonHandler} type="button">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
