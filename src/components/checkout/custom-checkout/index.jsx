import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { fetchFormAPI } from '../../../lib/helper'

const CustomCheckout = ({ shipping, cartItems, history: { push } }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    const items = cartItems.map(item => ({ price: item.price, quantity: item.quantity }))
    if (shipping) {
      const body = {
        cartItems: items,
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address
          }
        },
        description: 'payment intent for nomad shop',
        receipt_email: shipping.email
      }

      async function CustomCheckout() {
        const { clientSecret } = await fetchFormAPI('create-payment-intent', {
          body
        });
        setClientSecret(clientSecret)
      }
      CustomCheckout()
    }
  }, [shipping, cartItems]);


  async function handleCheckout() {
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    });

    if (payload.error) setError(`Payment failed: ${payload.error.message}`)
    else push('/success')
  }

  function cardHandleChange(e) {
    const { error } = e;
    setError(error ? error.message : '');
  }

  const cardStyle = {
    style: {
      base: {
        color: '#000',
        fontFamily: 'Robot, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        "::placeholder": {
          color: '#606060'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  }


  return <div>
    <h4>Enter Payment Ditales</h4>
    <div className='stripe-card'>
      <CardNumberElement
        className='card-element'
        options={cardStyle}
        onChange={cardHandleChange}
      />
    </div>
    <div className='stripe-card'>
      <CardExpiryElement
        className='card-element'
        options={cardStyle}
        onChange={cardHandleChange}
      />
    </div>
    <div className='stripe-card'>
      <CardCvcElement
        className='card-element'
        options={cardStyle}
        onChange={cardHandleChange}
      />
    </div>
    <div className='submit-btn'>
      <button disabled={processing} className='button is-black nomad-btn submit' onClick={handleCheckout}>
        {
          processing ? 'PROCESSING' : 'PAY'
        }
      </button>
    </div>
    {
      error && (<p className='error-message'>{error.message}</p>)
    }
  </div>;
}

export default withRouter(CustomCheckout);
