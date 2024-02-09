import { Request, Response } from 'express';
import LeaderboardSevice from '../services/leaderboardSevice';

export default class LeaderboardController {
  constructor(private leaderboardeService = new LeaderboardSevice()) {}

  async getAllleaderboardHome(req: Request, res: Response) {
    const { data } = await this.leaderboardeService.getAllleaderboardHome();
    return res.status(200).json(data);
  }

  async getAllLeaderboardAway(_req: Request, res: Response) {
    const { data } = await this.leaderboardeService.getAllLeaderboardAway();
    return res.status(200).json(data);
  }

  async getAllLeaderboard(_req: Request, res: Response) {
    const { data } = await this.leaderboardeService.getAllLeaderboard();
    return res.status(200).json(data);
  }
}
