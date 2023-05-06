import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./index.css";

import AddProductForm from "./components/add-product-form/add-product-form.tsx";
import ProductList from "./components/product-list/product-list.tsx";
import Cart from "./components/cart/cart.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products/create" element={<AddProductForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
