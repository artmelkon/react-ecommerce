import { Request, Response } from 'express'
import * as stripeAPI from '../../utils/stripe'
import { getCustomer } from './getCustomer'
import { DecodedIdToken } from 'firebase-admin/auth';

export async function setupIntent(req: Request, res: Response) {
  const { currentUser } = req;
  // get stripe customer
  const customer = await getCustomer((currentUser as DecodedIdToken).uid);
  let setupIntent;

  try {
    setupIntent = await stripeAPI.stripe.setupIntents.create({
      customer: customer!.id
    })
    res.status(200).json({ clientSecret: setupIntent.client_secret })
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'an error occured, unable to create setup intent' })
  }
}
