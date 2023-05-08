import {
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} from "../../services/cart.ts";

import "./cart-item.css";
import { useState } from "react";

interface ICartItemProps {
  cartItem: {
    cartId: number;
    id: number;
    productId: number;
    quantity: number;
    product: { id: number; name: string; price: number; image: string };
  };
}

const CartItem = ({ cartItem }: ICartItemProps) => {
  const [removeFromCart, { isLoading, isError }] = useRemoveFromCartMutation();
  const [
    updateQuantity,
    { isLoading: isUpdateQuantityLoading, isError: isUpdateQuantityError },
  ] = useUpdateQuantityMutation();

  const { product, quantity } = cartItem;
  const { name, price } = product;
  const [quantityCounter, setQuantityCounter] = useState(quantity);

  const onClickRemoveFromCartHandler = async () => {
    await removeFromCart({
      userId: localStorage.getItem("userId"),
      cartItemId: cartItem.id,
    });
  };

  const onClickAddQuantityButtonHandler = async () => {
    if (quantityCounter < 50) {
      setQuantityCounter(quantityCounter + 1);
      await updateQuantity({
        cartItemId: cartItem.id,
        quantity: quantityCounter + 1,
        userId: localStorage.getItem("userId"),
      });
      //   TODO debounce
    }
  };

  const onClickSubtractQuantityButtonHandler = async () => {
    if (quantityCounter > 1) {
      setQuantityCounter(quantityCounter - 1);
      await updateQuantity({
        cartItemId: cartItem.id,
        quantity: quantityCounter - 1,
        userId: localStorage.getItem("userId"),
      });
      //   TODO debounce
    }
  };

  return (
    <li>
      {isLoading && "is loading"}
      {isError && "is error"}
      {isUpdateQuantityLoading && "is loading"}
      {isUpdateQuantityError && "is error"}
      <span>
        {name}, {price}
      </span>
      <button onClick={onClickSubtractQuantityButtonHandler}>-</button>
      <span>{quantityCounter}</span>
      <button onClick={onClickAddQuantityButtonHandler}>+</button>
      <button onClick={onClickRemoveFromCartHandler} type="button">
        Delete from cart
      </button>
    </li>
  );
};

export default CartItem;
