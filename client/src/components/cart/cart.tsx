import { ChangeEvent, FormEvent, useState } from "react";

import CartItem from "../cart-item/cart-item.tsx";

import { useGetCartQuery, useRemoveCartMutation } from "../../services/cart.ts";
import { usePostOrderMutation } from "../../services/order.ts";

const Cart = () => {
  const id = Number(localStorage.getItem("userCartId"));
  const [phoneNumber, setPhoneNumber] = useState("");

  const { data: cartItems, isLoading, isError } = useGetCartQuery(id);
  console.log(cartItems);

  const [removeCart, { isLoading: isRemoving, isError: isRemoveError }] =
    useRemoveCartMutation();
  const [postOrder, { isLoading: isSending }] = usePostOrderMutation();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Some error occurred. Try later</div>;
  }

  if (!cartItems) {
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
    await removeCart({ cartId: id });
    localStorage.clear();
  };

  const onSubmitCartFormHandler = async (evt: FormEvent) => {
    const sum = cartItems.reduce((accum, current) => {
      accum += current.product.price * current.quantity;
      return accum;
    }, 0);

    if (phoneNumber && cartItems.length) {
      await postOrder({ cartId: id, customer_phone: "+8989", sum });
      localStorage.clear();
    }
  };
  // todo бот ссылку
  return (
    <div>
      <h1>Your user cart id {cartItems[0]?.cartId || "none"}</h1>
      <a href="https://t.me/mindOnlineStoreTestTaskBot">
        To receive notification in Telegram please follow this link and then get
        back here.
      </a>

      <ul>
        <li>Название, цена, количество</li>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>

      <form onSubmit={onSubmitCartFormHandler} onReset={onResetCartFormHandler}>
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
    </div>
  );
};

export default Cart;
