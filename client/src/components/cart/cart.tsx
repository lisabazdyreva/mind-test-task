import CartItem from "../cart-item/cart-item.tsx";

const Cart = () => {
  return (
    <div>
      <ul>
        <CartItem></CartItem>
        <CartItem></CartItem>
        <CartItem></CartItem>
        <CartItem></CartItem>
      </ul>

      <div>
        <button>Clear cart</button>
        <button>Send cart</button>
      </div>
    </div>
  );
};

export default Cart;
