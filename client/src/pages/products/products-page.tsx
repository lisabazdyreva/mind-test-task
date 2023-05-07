import ProductList from "../../components/product-list/product-list.tsx";
import Header from "../../components/header/header.tsx";

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <h2>List of all products in system</h2>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
