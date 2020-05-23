import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import '../auth/passportHandler';
import {
  JWT_SECRET,
  JWT_EXPIRATION_SECS,
  CLIENT_HOME_PAGE_URL,
} from '../util/secrets';
import {Authorizable} from '../models/user';

export const getUserIdFromRequest = (req: Request) =>
  req.user ? req.user._id : '5ec2a82761d31b7dda7910c7';

export class UserController {
  public localUserLogin(req: Request, res: Response) {
    // TODO: remove expiration constant to secrets
    const token = jwt.sign(
      {
        data: req.user,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRATION_SECS}
    );
    res.cookie('jwt', token, {
      maxAge: (1 + JWT_EXPIRATION_SECS) * 1000,
    });
    // TODO: redirect needed? I don't think so.
    res.status(200).redirect(CLIENT_HOME_PAGE_URL);
  }

  public getUser(req: Request, res: Response) {
    const user = req.user as Authorizable;
    return res.status(200).json({
      email: user.email,
      pictureUrl: user.authMethods.get('google')!.pictureUrl,
    });
  }
}
