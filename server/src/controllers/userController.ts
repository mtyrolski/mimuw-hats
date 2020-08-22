import {NextFunction, Request, Response} from 'express';
import {
  BadRequest,
  Conflict,
  GatewayTimeout,
  Unauthorized,
  UnprocessableEntity,
} from '@tsed/exceptions';
import * as jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

import '../auth/passportHandler';
import {
  JWT_SECRET,
  JWT_EXPIRATION_SECS,
  CLIENT_HOME_PAGE_URL,
  SENDGRID_API_KEY, SERVER_HOME_PAGE_URL,
} from '../util/secrets';
import {Authorizable, User} from '../models/user';
import {
  EmailPayload,
  EmailToken,
  isCorrectMimuwEmail,
} from '../auth/emailHandler';

export const getUserIdFromRequest = (req: Request) =>
  req.user ? req.user._id : '5ede43ffd8a37e4d8e83adbe';

export class UserController {
  public afterExternalAuth(req: Request, res: Response) {
    const token = jwt.sign(
      {
        data: req.user,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRATION_SECS}
    );
    res.status(200).redirect(`${CLIENT_HOME_PAGE_URL}?jwt=${token}`);
  }

  public getUser(req: Request, res: Response) {
    const user = req.user as Authorizable;
    return res.status(200).json({
      email: user.email,
      pictureUrl: user.authMethods.get('google')!.pictureUrl,
    });
  }

  public async registerEmail(req: Request, res: Response, next: NextFunction) {
    // TODO: think about better schema verification - automatic typescript interface + err handler?
    // TODO: check if user not already registered
    if (!('email' in req.body))
      return next(new BadRequest('No email provided.'));
    const payload = req.body as EmailPayload;

    if (!isCorrectMimuwEmail(payload.email))
      return next(new UnprocessableEntity('Not a MIMUW email.'));

    const alreadyExists = await User.exists({email: payload.email});
    if (alreadyExists) return next(new Conflict('User already exists'));

    const tokenWrapper = new EmailToken(payload);

    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: payload.email,
      from: 'kkrecikov@yandex.com',
      subject: 'Mimuw-hats: continue your registration',
      text:
        `Here is your activation link: ${SERVER_HOME_PAGE_URL}/api/user/google/register/${tokenWrapper.token}`
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      return next(new GatewayTimeout(error.response.body));
    }

    // TODO: return 200 without any payload (remove token)
    return res.status(200).json({
      token: tokenWrapper.token,
    });
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const token = req.params.token as string;
    try {
      const tokenWrapper = EmailToken.decode(token);
      req.params.email = tokenWrapper.email;
    } catch (err) {
      return next(new Unauthorized('Invalid token'));
    }
    // TODO: check if email not already registered
    return next();
  }
}
