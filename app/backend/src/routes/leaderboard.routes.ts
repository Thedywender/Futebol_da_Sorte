import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardeController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req: Request, res: Response) =>
  leaderboardeController.getAllleaderboardHome(req, res));

leaderboardRouter.get('/away', (req: Request, res: Response) =>
  leaderboardeController.getAllLeaderboardAway(req, res));

leaderboardRouter.get('/', (req:Request, res:Response) =>
  leaderboardeController.getAllLeaderboard(req, res));
export default leaderboardRouter;
