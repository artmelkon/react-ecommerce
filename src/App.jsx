import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/home-page";
import Shop from "./components/pages/shop";
import SingleProduct from './components/single-product';
import CartPage from "./components/pages/cart-page";
import NotFound from "./components/not-found";
import Checkout from "./components/checkout";
import Success from './components/checkout/stripe-checkout/success';
import Canceled from './components/checkout/stripe-checkout/canceled';
import SignUp from './components/auth/sign-up';
import SignIn from './components/auth/sign-in';
import "./App.scss";

export default function App() {
  return <div className="App">
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={Shop} />
      <Route path='/product/:id' component={SingleProduct} />
      <Route path='/cart' component={CartPage} />
      <Route path='/checkout' component={Checkout} />
      <Route path='/success' component={Success} />
      <Route path='/canceled' component={Canceled} />
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route path='*' component={NotFound} />
    </Switch>
  </div>;
}
