import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { routerApi } from './utils/routes';
import { dbConnect } from './utils/db-connect';

const app = express();
app.use(express.json({
  verify: (req: any, res, buffer) => req['rawBody'] = buffer
}))
app.use(cors());

routerApi(app)
dbConnect(app)
