import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import ValidationsLogin from '../middlewares/validations';
// import AuthMiddleware from '../middlewares/authMiddleware';

const userController = new UserController();

const loginRouter = Router();

// loginRouter.use(AuthMiddleware.authenticate);

loginRouter.post(
  '/',
  ValidationsLogin.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default loginRouter;
