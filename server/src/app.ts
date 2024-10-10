import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { routerApi } from './utils/routes';
import { dbConnect } from './utils/db-connect';

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
