import { Link } from "react-router-dom";

import "./header.css";
import { Route } from "../../utils/const.ts";

const Header = () => {
  return (
    <header>
      <Link to={`/${Route.Products}`}>Products</Link>
      <Link to={`/${Route.Cart}`}>Cart</Link>
      <Link to={`/${Route.ProductsCreate}`}>Create new product</Link>
    </header>
  );
};

export default Header;
