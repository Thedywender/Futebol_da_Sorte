import { Router, Request, Response } from 'express';
// import MatchesController from '../controllers/matchesController';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default matchesRouter;
