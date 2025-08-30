import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cart-context';
import Layout from '../shared/layout';
// import StripeCheckout from './stripe-checkout';
import ShippingAddress from './custom-checkout/shipping-address';
import CustomCheckout from './custom-checkout';
import './index.styles.scss';

const Checkout = () => {
  const [shipping, setShipping] = useState(null);
  const { itemCount, total, cartItems } = useContext(CartContext);
  const addressShown = {
    display: (shipping ? 'none' : 'block')
  }
  const cardShown = {
    display: (shipping ? 'block' : 'none')
  }
  return <Layout>
    <div className='checkout'>
      <h2>Chuckout Summary</h2>
      <h3>{`Tottal Items: ${itemCount}`}</h3>
      <h4>{`Amojnt to Pay: $${total}`}</h4>
      <div style={addressShown}>
        <ShippingAddress setShipping={setShipping} />
      </div>
      <div style={cardShown}>
        <CustomCheckout {...{shipping, cartItems}} />
      </div>
    </div>
  </Layout>
}

export default Checkout;
