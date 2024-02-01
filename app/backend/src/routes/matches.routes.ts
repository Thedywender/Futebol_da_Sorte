import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import AuthMiddleware from '../middlewares/authMiddleware';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

matchesRouter.patch(
  '/:id/finish',
  AuthMiddleware.authenticate,
  (req: Request, res: Response) => matchesController.updateMatchFinish(req, res),
);

export default matchesRouter;
