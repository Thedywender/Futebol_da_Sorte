import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import UserModel from '../models/userModel';

type loginResponseData = { token: string };
const message1 = 'Invalid email or password';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  async login(email: string, password: string): Promise<ServiceResponse<loginResponseData>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: message1 } };

    if (!email || !password) {
      return { status: 'UNAUTHORIZED', data: { message: message1 } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: message1 } };
    }

    const payload = { sub: user.id, role: user.role, email: user.email };
    const secret = process.env.JWT_SECRET ?? 'segredo';

    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
