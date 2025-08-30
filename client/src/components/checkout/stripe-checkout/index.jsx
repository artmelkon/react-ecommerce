import React, { useState, useContext, useRef, useCallback } from "react";
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from "../../../context/cart-context";
import { fetchFormAPI } from "../../../lib/helper";

const StripeCheckout = () => {
  const [email, setEmail] = useState('')
  const { cartItems } = useContext(CartContext);
  const emailRef = useRef();
  const stripe = useStripe()

  function emailHandler() {
    const email = emailRef.current.value
    setEmail(email)
  }

  const handleGuestChecko9ut = useCallback(async (e) => {
    e.preventDefault();
    const line_items = cartItems.map(item => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100, // amount in cents
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.imageUrl]
        }
      }
    }));

    const response = await fetchFormAPI('create-checkout-session', {
      body: { line_items, customer_email: email }
    });

    const { sessionId } = response;
    const { error } = await stripe.redirectToCheckout({
      sessionId
    });

    if (error) {
      console.log(error)
    }
  }, [cartItems, email, stripe]);

  return <form onSubmit={handleGuestChecko9ut}>
    <div>
      <input type='email' onChange={emailHandler} placeholder="Email" value={email} ref={emailRef} className="nomad-input" />
    </div>
    <div className="submit-btn">
      <button type='submit' className="button is-black nomad-btn submit">Order Checkout</button>
    </div>
  </form>
}

export default StripeCheckout;
