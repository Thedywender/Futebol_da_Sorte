import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import UserModel from '../models/userModel';

type loginResponseData = { token: string };
const message = 'All fields must be filled';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  async login(email: string, password: string): Promise<ServiceResponse<loginResponseData>> {
    if (!email || !password) {
      return { status: 'INVALID_DATA', data: { message } };
    }

    const user = await this.userModel.findByEmail(email);

    console.log(user);

    if (!user) return { status: 'INVALID_DATA', data: { message } };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'INVALID_DATA', data: { message } };
    }

    const payload = { sub: user.id, role: 'user', email: user.email };
    const secret = process.env.JWT_SECRET ?? 'segredo';

    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
