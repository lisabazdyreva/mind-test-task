import Product from "../product/product.tsx";
import "./product-list.css";

const ProductList = () => {
  return (
    <div className="product-list">
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default ProductList;
