import { stripe } from '../utils/stripe';

const webhookHandlers: any = {
  'checkout.session.completed': (data: any) => {
    console.log('checkoud success: ', data)
    // function logic goes here
  },
  'payment_intent.succeeded': (data: any) => {
    console.log('payment success: ', data)
  },
  'payment_intent.payment_failed': (data: any) => {
    console.log('payment failed: ', data)
  }
}

export function webhooks(req: any, res: any) {
  const sig = req.headers['stripe-signature'];
  let event: any | undefined;

  try {
    event = stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any | undefined) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (webhookHandlers[event.type]) {
    webhookHandlers[event.type](event.data.object);
  }
  res.status(200).end()
}
