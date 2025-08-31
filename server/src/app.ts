import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config(); // dotenc config must be before any file import

import { routerApi } from './utils/routes';
import { dbConnect } from './utils/db-connect';


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

routerApi(app)
dbConnect(app)
