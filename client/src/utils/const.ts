export const Route = {
  Products: "products",
  Cart: "cart",
  ProductsCreate: "products/create",
} as const;

export const InfoStatusMessage = {
  Loading: "Loading...",
  Error: "Some error occurred. Try later.",
  Removing: "Removing...",
  Sending: "Sending...",
} as const;

export const InfoContentMessage = {
  EmptyProducts: "No products added.",
  CreatedProduct: "Product successfully created.",
  PostedOrder: "Order was successfully posted.",
  EmptyCart:
    "Please, fill the phone number and add products to post your order",
} as const;

export const Quantity = {
  Max: 50,
  Min: 1,
};
