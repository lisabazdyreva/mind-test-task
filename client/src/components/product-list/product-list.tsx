import "./product-list.css";

import Product from "../product/product.tsx";
import { useGetProductsQuery } from "../../services/products.ts";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddToCartMutation, useGetCartQuery } from "../../services/cart.ts";
import { useCreateUserMutation } from "../../services/user.ts";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { v4 as uuidv4 } from "uuid";
import cartItem from "../cart-item/cart-item.tsx";

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  const userCartId = localStorage.getItem("userId");
  const [userId, setCartId] = useState(userCartId);

  const [addToCart, { isLoading: isAddCartLoading, isError: isAddCartError }] =
    useAddToCartMutation();
  const [createUser, { isLoading: isUserLoading }] = useCreateUserMutation();
  const { data: cartItems, isLoading: isCartItemsLoading } = useGetCartQuery(
    userId ?? skipToken
  ); //

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

  const onCreateUserHandler = async (productId: number) => {
    if (!localStorage.getItem("userId")) {
      const generatedId = uuidv4();
      await createUser({ userId: generatedId });

      localStorage.setItem("userId", generatedId);
      setCartId(generatedId);
    }

    await addToCart({
      productId,
      quantity: 1,
      userId: localStorage.getItem("userId"),
    });
  };

  const isAlreadyInCart = (productId: number) => {
    return cartItems
      ? Boolean(
          cartItems.filter((cartItem) => cartItem.product.id === productId)
            .length
        )
      : false;
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onCreateUserHandler={onCreateUserHandler}
          isAlreadyInCart={isAlreadyInCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
