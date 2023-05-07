import AddProductForm from "../../components/add-product-form/add-product-form.tsx";
import Header from "../../components/header/header.tsx";

const ProductCreatePage = () => {
  return (
    <div>
      <Header />
      <h1>Create new product</h1>
      <AddProductForm />
    </div>
  );
};

export default ProductCreatePage;
