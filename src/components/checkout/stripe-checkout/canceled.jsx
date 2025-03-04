import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "../../shared/layout";

const Canceled = ({history}) => {
  return <Layout>
    <div className="checkout">
      <h1>Payment failed!</h1>
      <p>Payment was not successful</p>
      <div>
        <button className="button is-black nomad-btn submit" onClick={() => history.push('/shop')}>Continure Shopping</button>
      </div>
    </div>
  </Layout>
}

export default withRouter(Canceled);
