import * as stripeApi from '../../utils/stripe'
import User from '../../models/users';

async function createCustomer(userId: string) {
  const userSnapShot = await User.findById(userId);
  if (!userSnapShot) return; const { email } = userSnapShot;
  const customer = await stripeApi.stripe.customers.create({
    email,
    metadata: {
      firebaseUID: userId
    }
  })

  await userSnapShot?.updateOne({ stripeCustomerId: customer.id });
  return customer;
}

export async function getCustomer(userId: string) {
  const userSnapShot = await User.findById(userId);
  if (!userSnapShot) return;
  const { stripeCustomerId } = userSnapShot;
  if (!stripeCustomerId) return createCustomer(userId);
  const customer = await stripeApi.stripe.customers.retrieve(stripeCustomerId);
  return customer;
}
