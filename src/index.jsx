import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ProductsContextProvider from "./context/products-context";
import CartContextProvider from "./context/cart-context";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProductsContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductsContextProvider>
  </BrowserRouter>
);

