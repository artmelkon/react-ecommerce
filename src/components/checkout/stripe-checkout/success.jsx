import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import Layout from "../../shared/layout";
import { CartContext } from "../../../context/cart-context";

const Success = ({ history }) => {
  const { clearCart } = useContext(CartContext);
  useEffect(clearCart, []);

  return <Layout>
    <div className="checkout">
      <h1>Thank you for your order!</h1>
      <p>We are currently processing your order and will send you a confimation email shortly</p>
      <div>
        <button className="button is-black nomad-btn submit" onClick={() => history.push('/shop')}>Continure Shopping</button>
      </div>
    </div>
  </Layout>
}

export default withRouter(Success);
