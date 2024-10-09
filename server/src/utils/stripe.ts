import Stripe from 'stripe';

const secretApiKey = process.env.STRIPE_SECRET_KEY;

if (!secretApiKey) throw new Error(`STRIPE_SECRET_KEY is not defined`)

export const stripe = new Stripe(secretApiKey, {
  apiVersion: '2024-06-20',
  typescript: true
})
