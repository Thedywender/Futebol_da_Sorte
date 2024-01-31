import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const secret = process.env.JWT_SECRET ?? 'segredo';
      const payload = jwt.verify(token, secret);
      res.locals.auth = payload;
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }
}
