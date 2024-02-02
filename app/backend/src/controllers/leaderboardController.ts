import { Request, Response } from 'express';
import LeaderboardSevice from '../services/leaderboardSevice';

export default class LeaderboardController {
  constructor(private leaderboradeService = new LeaderboardSevice()) {}

  async getAllleaderboardHome(req: Request, res: Response) {
    const { data } = await this.leaderboradeService.getAllleaderboardHome();
    return res.status(200).json(data);
  }
}
