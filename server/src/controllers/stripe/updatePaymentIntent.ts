import { Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import * as stripeAPI from '../../utils/stripe';
import { getCustomer } from './getCustomer';

export async function updatePaymentIntent(req: Request, res: Response) {
  const { currentUser, body: { paymentIntentId } } = req;
  const customer = await getCustomer((currentUser as DecodedIdToken).uid);

  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.stripe.paymentIntents.update(paymentIntentId, {
      customer: customer!.id
    })
    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'an error occured, unable to create payment intent!' })
  }
}

