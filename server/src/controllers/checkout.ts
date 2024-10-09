import { stripe } from "../utils/stripe";

export const postCheckout = async (req: any, res: any) => {
  const clientAppUrl = process.env.WEB_APP_URL;

  const { line_items, customer_email } = req.body;

  //  validate req body line items and email
  if (!line_items || !customer_email) {
    return res.status(400).json({ error: 'Some parameters are missing!' })
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ['card'], // You can omit this attribute to manage your payment methods from the Stripe Dashboard.
      mode: 'payment',
      customer_email,
      success_url: `${process.env.WEB_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_APP_URL}/canceled`,
      shipping_address_collection: { allowed_countries: ['US', 'GB', 'FR', 'AR'] }
    });
    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'an error occured, unable to create session' })
  }
}
