import CartItem from "../cart-item/cart-item.tsx";
import { useGetCartQuery, useRemoveCartMutation } from "../../services/cart.ts";
import { ChangeEvent, FormEvent, useState } from "react";
import { usePostOrderMutation } from "../../services/order.ts";

const Cart = () => {
  const id = Number(localStorage.getItem("userCartId")) || 0;
  const [phoneNumber, setPhoneNumber] = useState("");

  const { data: cartItems, isLoading } = useGetCartQuery(id);
  const [removeCart] = useRemoveCartMutation();
  const [postOrder] = usePostOrderMutation();

  const onChangePhoneNumberInputHandler = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    setPhoneNumber(target.value);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!cartItems) {
    return <div>No products :(</div>;
  }

  const onSubmitCartFormHandler = async (evt: FormEvent) => {
    evt.preventDefault();
    const sum = cartItems.reduce((accum, current) => {
      accum += current.product.price * current.quantity;
      return accum;
    }, 0);

    if (phoneNumber) {
      await postOrder({ cartId: 1, customer_phone: "+8989", sum });
      await onResetCartFormHandler();
    }
  };

  const onResetCartFormHandler = async () => {
    await removeCart({ cartId: id });
    localStorage.clear();
  };

  return (
    <div>
      <h1>Your user cart id {cartItems[0]?.cartId || "none"}</h1>
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
        <button type="submit" disabled={!phoneNumber.length}>
          Send cart
        </button>
      </form>
    </div>
  );
};

export default Cart;
