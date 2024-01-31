import { Response, Request, NextFunction } from 'express';

class ValidationsLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login.email)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (login.password.length <= 6) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default ValidationsLogin;
