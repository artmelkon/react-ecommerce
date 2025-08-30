import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


import App from "./App";
import ProductsContextProvider from "./context/products-context";
import CartContextProvider from "./context/cart-context";
import { AuthContextProvider } from "./context/auth";
import "./index.scss";

const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)


const root = ReactDOM.createRoot(
  document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProductsContextProvider>
      <CartContextProvider>
        <Elements stripe={stripePromise}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </Elements>
      </CartContextProvider>
    </ProductsContextProvider>
  </BrowserRouter>
);

