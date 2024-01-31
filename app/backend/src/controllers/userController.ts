import { Request, Response } from 'express';
import UserService from '../services/userService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { status, data } = await this.userService.login(email, password);
    const statusCode = mapStatusHTTP(status);

    return res.status(statusCode).json(data);
  }
}
