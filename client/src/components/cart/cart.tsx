import { ChangeEvent, FormEvent, useState } from "react";

import { useGetCartQuery, useRemoveCartMutation } from "../../services/cart.ts";
import { usePostOrderMutation } from "../../services/order.ts";
import CartItem from "../cart-item/cart-item.tsx";
import { useRemoveUserMutation } from "../../services/user.ts";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

const Cart = () => {
  const id = localStorage.getItem("userId");
  const [userId, setUserId] = useState(id);

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useGetCartQuery(userId ?? skipToken);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [removeCart, { isLoading: isRemoving, isError: isRemoveError }] =
    useRemoveCartMutation();

  const [removeUser] = useRemoveUserMutation();
  const [postOrder, { isLoading: isSending }] = usePostOrderMutation();

  if (!cartItems || id === null) {
    return <div>Please add items in cart</div>;
  }

  if (isError) {
    return <div>Some error occurred. Try later</div>;
  }

  if (!cartItems) {
    return <div>No products :(</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!cartItems?.length) {
    return <div>No products :(</div>;
  }

  if (isRemoving) {
    return <div>Trying to remove...</div>;
  }

  if (isSending) {
    return <div>'Trying to send</div>;
  }

  if (isRemoveError) {
    return <div>Remove error</div>;
  }

  const onChangePhoneNumberInputHandler = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    setPhoneNumber(target.value);
  };

  const onResetCartFormHandler = async () => {
    await removeCart({ userId: localStorage.getItem("userId") });
    // await removeUser({ userId: id });

    setUserId(null);
    localStorage.clear();
  };

  const onSubmitCartFormHandler = async (evt: FormEvent) => {
    const sum = cartItems.reduce((accum, current) => {
      accum += current.product.price * current.quantity;
      return accum;
    }, 0);

    if (phoneNumber && cartItems.length) {
      await postOrder({ userId: id, customer_phone: "+8989", sum });
      await removeUser({ userId: id });

      await setUserId(null);
      await localStorage.clear();

      console.log(cartItems);
    }
  };
  // todo бот ссылку

  return (
    <div>
      {!id && <p>Please create and add product</p>}
      {cartItems.length && id && (
        <>
          <h1>Your user cart id {cartItems[0]?.cartId || "none"}</h1>
          <a href="https://t.me/mindOnlineStoreTestTaskBot">
            To receive notification in Telegram please follow this link and then
            get back here.
          </a>
          <ul>
            <li>Название, цена, количество</li>
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>

          <form
            onSubmit={onSubmitCartFormHandler}
            onReset={onResetCartFormHandler}
          >
            <label htmlFor="user_phone_number">Where to post order</label>
            <input
              id="user_phone_number"
              type="tel"
              placeholder="Enter your phone number, please"
              value={phoneNumber}
              onChange={onChangePhoneNumberInputHandler}
            />

            <button type="reset">Clear cart</button>
            <button
              type="submit"
              disabled={!phoneNumber.length || !cartItems.length}
            >
              Send cart
            </button>
            {(!phoneNumber.length || !cartItems.length) && (
              <p>
                Please, fill the phone number and add items in cart to post your
                order.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Cart;
