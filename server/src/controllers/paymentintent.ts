import {stripe} from '../utils/stripe';

function calculateOrderAmount(cartItems: any) {
  return cartItems.reduce((total: number, product: any) => {
    return total + product.price * product.quantity;
  }, 0) * 100;
}

export const paymentIntent = async (req: any, res: any) => {
  const {cartItems, description, receipt_email, shipping} = req.body;
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: 'usd',
      description,
      payment_method_types: ['card'],
      receipt_email,
      shipping
    });

    res.status(200).json({clientSecret: paymentIntent.client_secret})
  } catch (error) {
    console.error(error);
    res.status(400).json({error: 'an error occured, unable to create payment intent!'})
  }
}
