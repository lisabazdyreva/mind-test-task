import { IProduct } from "../../types/product.ts";

interface IProductProps {
  product: IProduct;
  onCreateUserHandler: (id: number) => void;
  isAlreadyInCart: (id: number) => boolean;
}

const Product = ({
  product,
  onCreateUserHandler,
  isAlreadyInCart,
}: IProductProps) => {
  const onClickAddToCartButtonHandler = () => {
    onCreateUserHandler(product.id);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>

      <button
        onClick={onClickAddToCartButtonHandler}
        type="button"
        disabled={isAlreadyInCart(product.id)}
      >
        cart
      </button>
      {/*{isLoading && "Trying add to cart..."}*/}
      {/*{isError && "Some error occurred. We cannot add this product to cart"}*/}
    </div>
  );
};

export default Product;
