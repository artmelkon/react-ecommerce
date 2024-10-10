import express from 'express';
import * as ProductContorlers from '../controllers/products';
import * as ChecoutControlers from '../controllers/checkout';
import * as WebhookContorller from '../controllers/webhooks';
import * as PaymentController from '../controllers/paymentintent';
import * as AuthController from '../controllers/autth';
const router = express.Router();

router.post('/product', ProductContorlers.postProduct);
router.post('/create-checkout-session', ChecoutControlers.postCheckout);
router.post('/create-payment-intent', PaymentController.paymentIntent)
router.post('/webhook', WebhookContorller.webhooks);
router.post('/signup', AuthController.postSignUp);
router.post('/signin', AuthController.postSignIn);
router.post('/me', AuthController.postMe)

export { router };
