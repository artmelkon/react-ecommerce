import { DecodedIdToken } from 'firebase-admin/auth';
import { Request, Response } from 'express';
import * as stripeAPI from '../../utils/stripe';
import { getCustomer } from './getCustomer';

export async function getCards(req: Request, res: Response) {
  const { currentUser } = req;
  const customer = await getCustomer((currentUser as DecodedIdToken).uid);

  let cards;

  try {
    cards = await stripeAPI.stripe.paymentMethods.list({
      customer: customer!.id,
      type: 'card'
    })
    res.status(200).json(cards.data)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'an error occured, unable to get cards' })
  }
}
