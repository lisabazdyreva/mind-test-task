import CartItem from "../cart-item/cart-item.tsx";
import type { Cart } from "../../types/cart-item.ts";

import "./cart.css";

interface ICartProps {
  cartItems: Cart;
}

const Cart = ({ cartItems }: ICartProps) => {
  return (
    <div className="cart">
      <h2 className="cart__title">
        Your user cart id {cartItems[0]?.cartId || "none"}
      </h2>
      <ul className="cart__product-list">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </div>
  );
};

export default Cart;
