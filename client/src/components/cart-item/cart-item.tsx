import { useState } from "react";
import {
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} from "../../services/cart.ts";

import "./cart-item.css";

import { InfoStatusMessage, Quantity } from "../../utils/const.ts";
import { useDebounce } from "../../hooks/useDebounce.ts";
import { getErrorMessage } from "../../utils/utils.ts";

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
  const { product, quantity } = cartItem;
  const { name, price } = product;

  const [quantityCounter, setQuantityCounter] = useState(quantity);

  const [removeFromCart, { isLoading, isError }] = useRemoveFromCartMutation();
  const [updateQuantity, { error: updateQuantityError }] =
    useUpdateQuantityMutation();

  const onClickRemoveFromCartHandler = async () => {
    await removeFromCart({
      userId: localStorage.getItem("userId"),
      cartItemId: cartItem.id,
    });
  };

  const changeQuantity = (value: number) => {
    setQuantityCounter(value);
    debouncedQuantity(value);
  };

  const updateQuantityAction = async (value: number) =>
    await updateQuantity({
      cartItemId: cartItem.id,
      quantity: value,
      userId: localStorage.getItem("userId"),
    });

  const debouncedQuantity = useDebounce(updateQuantityAction, 500);

  const onClickAddQuantityButtonHandler = () => {
    if (quantityCounter < Quantity.Max) {
      changeQuantity(quantityCounter + 1);
    }
  };

  const onClickSubtractQuantityButtonHandler = () => {
    if (quantityCounter > Quantity.Min) {
      changeQuantity(quantityCounter - 1);
    }
  };
  return (
    <li className="product-item cart__product-item">
      {isError && InfoStatusMessage.Error}
      {updateQuantityError && <p>{getErrorMessage(updateQuantityError)}</p>}
      <span className="product-item__product">
        {name}, {price}$
      </span>
      <button className="button" onClick={onClickSubtractQuantityButtonHandler}>
        -
      </button>
      <span>{quantityCounter}</span>
      <button className="button" onClick={onClickAddQuantityButtonHandler}>
        +
      </button>
      <button
        className="button"
        onClick={onClickRemoveFromCartHandler}
        type="button"
      >
        {isLoading ? InfoStatusMessage.Loading : "Delete"}
      </button>
    </li>
  );
};

export default CartItem;
