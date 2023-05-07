import Cart from "../../components/cart/cart.tsx";
import Header from "../../components/header/header.tsx";

const CartPage = () => {
  return (
    <div>
      <Header />
      <h2>Cart</h2>
      <Cart />
    </div>
  );
};

export default CartPage;
