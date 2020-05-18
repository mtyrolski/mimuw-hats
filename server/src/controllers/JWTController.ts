import {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import '../auth/passportHandler';
import {CLIENT_HOME_PAGE_URL} from '../util/secrets';

export class JWTController {
  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      'jwt',
      {
        session: false,
      },
      (err, user, info) => {
        if (err) {
          console.log(err);
          return res.status(401).json({status: 'error', code: 'unauthorized'});
        }
        if (!user) {
          return res.status(401).json({status: 'error', code: 'unauthorized'});
        } else {
          console.log(info);
          return next();
        }
      }
    )(req, res, next);
  }

  public logoutJWT(req: Request, res: Response) {
    // TODO: constant for jwt cookie field (-Wnomagic)
    res.clearCookie('jwt');
    return res.redirect(CLIENT_HOME_PAGE_URL);
  }
  /*
  public authorizeJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', (err, user, jwtToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({status: 'error', code: 'unauthorized'});
      }
      if (!user) {
        return res.status(401).json({status: 'error', code: 'unauthorized'});
      } else {
        const scope = req.baseUrl.split('/').slice(-1)[0];
        const authScope = jwtToken.scope;
        if (authScope && authScope.indexOf(scope) > -1) {
          return next();
        } else {
          return res.status(401).json({status: 'error', code: 'unauthorized'});
        }
      }
    })(req, res, next);
  }
*/
}
