import { ChangeEvent, FormEvent, useState } from "react";

import "./add-product-form.css";

import { useCreateProductMutation } from "../../services/products.ts";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(""); //TODO image addition

  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const onChangeNameInputHandler = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    setName(target.value);
  };

  const onChangePriceInputHandler = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    setPrice(Number(target.value));
  };

  const onChangeImageInputHandler = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    setImage(target.value);
  };

  const onSubmitAddProductFormHandler = async (evt: FormEvent) => {
    evt.preventDefault();

    if (name && price) {
      await createProduct({ name, price, image: "url" });
    }
  };

  return (
    <div className="add-product-form__wrapper">
      {error && JSON.parse(JSON.stringify(error)).data.message}
      {isLoading && "Loading..."}
      <form
        className="add-product-form"
        onSubmit={onSubmitAddProductFormHandler}
      >
        <label htmlFor="product_name">Name</label>
        <input
          id="product_name"
          type="text"
          placeholder="Name of product"
          value={name}
          autoComplete="off"
          onChange={onChangeNameInputHandler}
        />

        <label htmlFor="product_price">Price</label>
        <input
          id="product_price"
          type="number"
          value={price}
          onChange={onChangePriceInputHandler}
        />

        <label htmlFor="product_image">Choose image</label>
        <input
          id="product_image"
          type="text"
          value={image}
          onChange={onChangeImageInputHandler}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddProductForm;
