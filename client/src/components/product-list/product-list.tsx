import "./product-list.css";

import Product from "../product/product.tsx";
import { useGetProductsQuery } from "../../services/products.ts";

const ProductList = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products) {
    return <div>No products :(</div>;
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
