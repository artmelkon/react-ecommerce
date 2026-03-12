import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

import AuthContext from '../../../context/auth'
import { fetchFromAPI } from '../../../lib/helper'

const CustomCheckout = ({ shipping, cartItems, history: { push } }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [cards, setCards] = useState(null);
  const [payment, setPaymentCard] = useState('');
  const [saveCard, setSavedCard] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const elements = useElements();
  const stripe = useStripe();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const items = cartItems.map(item => ({ price: item.price, quantity: item.quantity }));
    if (user) {
      const savedCard = async () => {
        try {
          const cardList = await fetchFromAPI('get-payment-methods', {
            method: 'GET'
          });
          setCards(cardList);
        } catch (error) {
          console.error(error);
        }
      }
      savedCard();
    }
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

      async function customCheckout() {
        const { clientSecret, id } = await fetchFromAPI('create-payment-intent', {
          body
        });
        setClientSecret(clientSecret)
        setPaymentIntentId(id)
      }
      customCheckout()
    }
  }, [shipping, cartItems, user]);


  async function handleCheckout() {
    setProcessing(true);
    let si; // setup intent
    // check if user select to save card
    if (saveCard) {
      // make to create a setup intent
      si = await fetchFromAPI('save-payment-method');
    }
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`)
    } else {
      if (saveCard && si) {
        // send the customers card details to be saved with stripe
        await stripe.confirmCardSetup(si.clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement)
          }
        })
        push('/success')
      } else {
        push('/success')
      }
    }
  }

  async function savedCardCheckout() {
    setProcessing(true);
    // update the payment intent to include the customer parameter
    const { clientSecret } = await fetchFromAPI('update-payment-intent', {
      body: { paymentIntentId },
      method: 'PUT',
    });

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: payment
    })

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      processing(false);
    } else {
      push('/success');
      setProcessing(false)
    }
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

  let cardOption;
  if (cards) {
    cardOption = cards.map(card => {
      const { card: { brand, last4, exp_month, exp_year } } = card;
      return (
        <option key={card.id} value={card.id}>
          {`${brand} **** **** **** ${last4} ${exp_month}/${exp_year}}`}
        </option>
      )
    });
    cardOption.unshift(
      <option key='Select a Card' value=''>Select a Card</option>
    )
  }
  return <div>
    {
      user && (cards && cards.length > 0) && (<div>
        <h4>Select a Card</h4>
        <select value={payment} onChange={e => setPaymentCard(e.target.value)}>
          {cardOption}
        </select>
        <button
          type='submit'
          disabled={processing || !payment}
          className='button is-black nomad-btn submit savedd-card-btn'
          onClick={() => savedCardCheckout()}
        >
          {processing ? 'PROCESSING' : 'PAY WITH SAVED CARD'}
        </button>
      </div>)
    }
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
    {
      user &&
      <div className='save-card'>
        <label>Save Card</label>
        <input
          type='checkbox'
          checked={saveCard}
          onChange={e => setSavedCard(e.target.checked)}
        />
      </div>
    }
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
  </div >;
}

export default withRouter(CustomCheckout);
