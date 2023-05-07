import { useRemoveFromCartMutation } from "../../services/cart.ts";

import "./cart-item.css";

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
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  const { product, quantity } = cartItem;
  const { name, price } = product;

  const onClickRemoveFromCartHandler = async () => {
    await removeFromCart({ cartItemId: cartItem.id });
  };

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <li>
      <span>
        {name}, {price}
      </span>
      <span>{quantity}</span>
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
