import {Router} from 'express';
import {UserController} from '../controllers/userController';
import {GoogleOauthController} from '../controllers/googleOauthController';
import {JWTController} from '../controllers/JWTController';

export class UserRoutes {
  router: Router;
  public userController: UserController = new UserController();
  public authController: JWTController = new JWTController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/register', this.userController.registerEmail);

    this.router.get(
      '/google/register/:token',
      this.userController.register,
      GoogleOauthController.loginMiddleware
    );
    this.router.get('/google', GoogleOauthController.loginMiddleware);

    this.router.get(
      '/login',
      this.authController.authenticateJWT,
      this.userController.getUser
    );

    this.router.get('/logout', this.authController.logoutJWT);
    this.router.get(
      '/google/redirect',
      GoogleOauthController.redirectMiddleware(),
      this.userController.afterExternalAuth
    );
  }
}
