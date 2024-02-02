import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import AuthMiddleware from '../middlewares/authMiddleware';
import Validations from '../middlewares/validations';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

matchesRouter.patch(
  '/:id/finish',
  AuthMiddleware.authenticate,
  (req: Request, res: Response) => matchesController.updateMatchFinish(req, res),
);

matchesRouter.patch(
  '/:id',
  AuthMiddleware.authenticate,
  (req: Request, res: Response) => matchesController.updateMatchId(req, res),
);

matchesRouter.post(
  '/',
  AuthMiddleware.authenticate,
  Validations.validateTeam,
  (req: Request, res: Response) => matchesController.createMatches(req, res),
);

export default matchesRouter;
