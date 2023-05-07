import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./app.css";

import ProductCreatePage from "./pages/product-create/product-create-page.tsx";
import ProductsPage from "./pages/products/products-page.tsx";
import CartPage from "./pages/cart/cart-page.tsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products/create" element={<ProductCreatePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
