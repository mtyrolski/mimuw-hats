import passport from 'passport';
import '../auth/passportHandler';
import {NextFunction, Request, Response} from 'express';

export class GoogleOauthController {
  public static authName = 'google';

  public static loginMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {email} = req.params;
    const state = email ? email : undefined;
    const auth = passport.authenticate(GoogleOauthController.authName, {
      session: false,
      scope: ['https://www.googleapis.com/auth/plus.login'],
      state,
    });
    return auth(req, res, next);
  }

  public static redirectMiddleware() {
    return passport.authenticate(GoogleOauthController.authName, {
      session: false,
      // TODO: Remove hardcoded route!
      failureRedirect: '/api/user/login',
    });
  }
}
