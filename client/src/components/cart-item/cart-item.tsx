import {
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} from "../../services/cart.ts";

import "./cart-item.css";
import { useEffect, useState } from "react";

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
    await removeFromCart({ userCartId: cartItem.id });
  };

  const onClickAddQuantityButtonHandler = async () => {
    if (quantityCounter < 50) {
      setQuantityCounter(quantityCounter + 1);
      //   TODO debounce
    }
  };

  const onClickSubtractQuantityButtonHandler = async () => {
    if (quantityCounter > 1) {
      setQuantityCounter(quantityCounter - 1);
      //   TODO debounce
    }
  };

  useEffect(() => {
    const postQuantity = async () => {
      await updateQuantity({
        cartItemId: cartItem.id,
        quantity: quantityCounter,
      });
    };

    postQuantity();
  }, [quantityCounter]);

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
      {/*{cartItem.cartId} product id: {cartItem.productId} quantity: name*/}
      {/*<span>*/}
      {/*  <button>Add 1</button>*/}
      {/*  {cartItem.quantity}*/}
      {/*  <button>Minus One</button>*/}
      {/*</span>*/}
      {/*<span>{price * quantity}</span>*/}
      <button onClick={onClickRemoveFromCartHandler} type="button">
        Delete from cart
      </button>
    </li>
  );
};

export default CartItem;
