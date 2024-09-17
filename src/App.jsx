import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/home-page";
import Shop from "./components/pages/shop";
import SingleProduct from './components/single-product';
import NotFound from "./components/not-found";
import "./App.scss";

export default function App() {
  return <div className="App">
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={Shop} />
      <Route path='/product/:id' component={SingleProduct} />
      <Route path='*' component={NotFound} />
    </Switch>
  </div>;
}
