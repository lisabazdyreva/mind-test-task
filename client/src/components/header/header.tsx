import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <header>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/products/create">Create new product</Link>
    </header>
  );
};

export default Header;
