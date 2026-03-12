import { NextFunction, Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import * as firebaseAdmin from './firebaseAdmin';

declare module 'express' {
  export interface Request {
    currentUser?: DecodedIdToken;
  }
}

export async function decodeJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idTalken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await firebaseAdmin.auth.verifyIdToken(idTalken);
      req['currentUser'] = decodedToken;
    } catch (error) {
      console.error(error)
    }
  }

  next();
}
