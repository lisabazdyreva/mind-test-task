import "./product-list.css";

import Product from "../product/product.tsx";
import { useGetProductsQuery } from "../../services/products.ts";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Some error occurred. Try later.</div>;
  }

  if (!products?.length) {
    return (
      <div>
        No products added. <br />
        <Link to="/products/create">Create your first product</Link>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
