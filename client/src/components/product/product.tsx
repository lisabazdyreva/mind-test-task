import { IProduct } from "../../types/product.ts";

import "./product.css";
import { InfoStatusMessage } from "../../utils/const.ts";

interface IProductProps {
  product: IProduct;
  onCreateUserHandler: (id: number) => void;
  isAlreadyInCart: (id: number) => boolean;
  isLoading: boolean;
}

const Product = ({
  product,
  onCreateUserHandler,
  isAlreadyInCart,
  isLoading,
}: IProductProps) => {
  const { id, name, price, image } = product;
  const onClickAddToCartButtonHandler = async () => {
    await onCreateUserHandler(id);
  };

  const isInCart = isAlreadyInCart(product.id);

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        {image && (
          <img
            className="product-card__image"
            src={import.meta.env.VITE_REACT_APP_API_URL + "static/" + image}
            alt="Фото продукта "
          />
        )}
      </div>
      <h2 className="product-card__title">{name}</h2>
      <p className="product-card__price">{price}$</p>
      <button
        className="product-card__button button"
        onClick={onClickAddToCartButtonHandler}
        type="button"
        disabled={isInCart}
      >
        {isInCart
          ? "Already in cart"
          : isLoading
          ? InfoStatusMessage.Loading
          : "Add to cart"}
      </button>
    </div>
  );
};

export default Product;
