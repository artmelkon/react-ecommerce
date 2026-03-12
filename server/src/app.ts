import './env'
import express from 'express';
import cors from 'cors';

import { routerApi } from './utils/routes';
import { dbConnect } from './utils/db-connect';
import { decodeJWT } from './utils/decodeJWT';

console.log('client uri: ', process.env.WEB_APP_URL)

const corsOptions = {
  origin: process.env.WEB_APP_URL,
  credentials: true
}

const app = express();
app.use(express.json({
  verify: (req: any, res, buffer) => req['rawBody'] = buffer
}))
app.use(cors(corsOptions));
app.use(decodeJWT)

routerApi(app)
dbConnect(app)
