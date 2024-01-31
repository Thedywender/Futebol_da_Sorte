import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import ValidationsLogin from '../middlewares/validations';
import AuthMiddleware from '../middlewares/authMiddleware';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  ValidationsLogin.validateLoginFields,
  (req: Request, res: Response) => userController.login(req, res),
);

// loginRouter.use(AuthMiddleware.authenticate);

loginRouter.get(
  '/role',
  AuthMiddleware.authenticate,
  (req:Request, res: Response) => UserController.roleToken(req, res),
);

export default loginRouter;
