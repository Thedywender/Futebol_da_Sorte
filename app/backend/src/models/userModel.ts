import { IUser } from '../Interfaces/Users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: { email },
    });

    if (!user) return null;

    return user;
  }
}
