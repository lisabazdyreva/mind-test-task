import "./add-product-form.css";

const AddProductForm = () => {
  return (
    <div className="add-product-form__wrapper">
      <form className="add-product-form">
        <label htmlFor="product_title">Title</label>
        <input id="product_title" type="text" placeholder="Name of product" />

        <label htmlFor="product_price">Price</label>
        <input id="product_price" type="number" />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddProductForm;
